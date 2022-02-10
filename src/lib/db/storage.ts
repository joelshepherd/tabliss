import equals from "fast-deep-equal/es6";
import { Browser } from "webextension-polyfill";
import * as DB from "./db";

/** IndexedDB storage provider */
export const indexeddb = (db: DB.Database, name: string): void => {
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
};

/** Web Extension storage provider */
export const extension = (
  db: DB.Database,
  name: string,
  areaName: "local" | "sync" | "managed",
): void => {
  const browser = require("webextension-polyfill") as Browser;
  const area = browser.storage[areaName];

  // load from storage on init
  // TODO: the promise causes the db to use blank data to begin with
  //       need some sort of ready indicator
  // TODO: for tabliss, config gets loaded before cache; which leads unsplash to fetch new images, rather than waiting for the cache
  //       moving cache to the browser cache APIs might work around this problem
  area
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

  // watch for storage changes
  // TODO: updates will be trigger on the same tab, might need more than the equals check
  // TODO: add a test case for this
  // browser.storage.onChanged.addListener((changes, changeArea) => {
  //   if (changeArea === areaName)
  //     Object.keys(changes)
  //       .filter((key) => key.startsWith(name))
  //       .forEach((key) => {
  //         const val = changes[key].newValue;
  //         const prev = changes[key].oldValue;
  //         key = key.substring(name.length + 1);
  //         if (equals(DB.get(db, key), prev)) DB.put(db, key, val);
  //       });
  // });

  // listen to db changes
  DB.listen(
    db,
    batch((changes) => {
      const updates = Object.fromEntries(
        changes.filter(([, val]) => val !== null),
      );
      const deletes = changes
        .filter(([, val]) => val === null)
        .map(([key]) => key);

      // TODO: error handling
      area.set(updates);
      area.remove(deletes);
    }),
  );
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
