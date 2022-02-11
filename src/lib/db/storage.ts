import equals from "fast-deep-equal/es6";
import { Browser } from "webextension-polyfill";
import * as DB from "./db";

/** IndexedDB storage provider */
export const indexeddb = (db: DB.Database, name: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    const open = indexedDB.open(name, 1);
    open.onerror = (err) => {
      // TODO: error handling
    };
    open.onupgradeneeded = () => {
      open.result.createObjectStore("changes");
    };
    open.onsuccess = () => {
      const trx = open.result.transaction("changes");
      trx.onerror = (err) => {
        // TODO: error handling
      };
      const cursor = trx.objectStore("changes").openCursor();
      cursor.onerror = (err) => {
        // TODO: error handling
      };
      cursor.onsuccess = () => {
        if (cursor.result) {
          if (typeof cursor.result.key !== "string")
            throw new Error("invalid key");
          DB.put(db, cursor.result.key, cursor.result.value);
          cursor.result.continue();
        } else {
          // Finish proccessing
          resolve();
        }
      };

      DB.listen(
        db,
        batch((changes) => {
          const trx = open.result.transaction("changes", "readwrite");
          const store = trx.objectStore("changes");
          changes.forEach(([key, val]) => {
            if (val === null) store.delete(key);
            else store.put(val, key);
          });
          trx.oncomplete = () => {}; // nice
          trx.onerror = () => {
            // TODO: error handling
          };
        }),
      );
    };
  });
};

/** Web Extension storage provider */
export const extension = async (
  db: DB.Database,
  name: string,
  areaName: "local" | "sync" | "managed",
): Promise<void> => {
  const browser = require("webextension-polyfill") as Browser;
  const storageArea = browser.storage[areaName];

  // Populate db from storage
  await storageArea
    .get()
    .then((stored) =>
      Object.keys(stored)
        .filter((key) => key.startsWith(name))
        .forEach((key) =>
          DB.put(db, key.substring(name.length + 1), stored[key]),
        ),
    )
    .catch((err) => {
      // TODO: error handling
      throw err;
    });

  // Setup listener
  const listener = batch<DB.Change>((changes) => {
    const updates = Object.fromEntries(
      changes
        .filter(([, val]) => val !== null)
        .map(([key, val]) => [`${name}/${key}`, val]),
    );
    const deletes = changes
      .filter(([, val]) => val === null)
      .map(([key]) => `${name}/${key}`);

    // TODO: error handling
    storageArea.set(updates);
    storageArea.remove(deletes);
  });
  DB.listen(db, listener);
};

const batch = <T>(
  flush: (batch: T[]) => void,
  timeout = 0,
): ((val: T) => void) => {
  let items: T[] = [];
  let timer: any = null;

  const run = () => {
    flush(items);
    items = [];
    timer = null;
  };

  // If there are pending changes on browser close, flush immediately
  window.addEventListener("beforeunload", () => {
    if (timer) {
      clearTimeout(timer);
      run();
    }
  });

  return (val) => {
    items.push(val);
    if (!timer) timer = setTimeout(run, timeout);
  };
};
