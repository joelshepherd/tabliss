import { Browser } from "webextension-polyfill";
import { capture } from "../../errorHandler";
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
          // TODO: iterator helpers
          for (const [key,val] of changes) {
            if (val === null) store.delete(key);
            else store.put(val, key);
          }
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
      capture(err);
      alert("Error reading from storage on init: " + err);
    });

  // Setup listener
  const listener = batch((changes) => {
    // TODO: test for both updates and deletes for the same key
    // TODO: iterator helpers
    const changesArray = Array.from(changes);
    const updates = Object.fromEntries(
      changesArray
        .filter(([, val]) => val !== null)
        .map(([key, val]) => [`${name}/${key}`, val]),
    );
    const deletes = changesArray
      .filter(([, val]) => val === null)
      .map(([key]) => `${name}/${key}`);

    // TODO: error handling
    storageArea.set(updates).catch((err) => {
      capture(err);
      alert("Error writing updates to storage on change: " + err);
    });
    storageArea.remove(deletes).catch((err) => {
      capture(err);
      alert("Error writing deletes to storage on change: " + err);
    });
  });
  DB.listen(db, listener);
};

const batch = (
  flush: (batch: Iterable<DB.Change>) => void,
  timeout = 0,
): DB.Listener => {
  const changes = new Map();
  let timer: any = null; // TODO: remove @types/node then set to number

  const run = () => {
    flush(changes);
    changes.clear();
    timer = null;
  };

  // If there are pending changes on browser close, flush immediately
  window.addEventListener("beforeunload", () => {
    if (timer) {
      clearTimeout(timer);
      run();
    }
  });

  return ([key, val]) => {
    changes.set(key, val);
    if (!timer) timer = setTimeout(run, timeout);
  };
};
