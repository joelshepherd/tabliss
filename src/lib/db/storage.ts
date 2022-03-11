import { Browser } from "webextension-polyfill";
import * as DB from "./db";

/** IndexedDB storage provider */
export const indexeddb = (db: DB.Database, name: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // Map idb errors to a standard format
    const mapError = (message: string) => (err: unknown) => {
      const cause =
        err instanceof Event &&
        err.target instanceof IDBRequest &&
        err.target.error instanceof Error
          ? err.target.error
          : undefined;
      reject(new Error(`StorageError: IndexedDB: ${message}`, { cause }));
    };

    const open = indexedDB.open(name, 1);
    open.onerror = mapError("Cannot open storage");
    open.onupgradeneeded = () => {
      open.result.createObjectStore("changes");
    };
    open.onsuccess = () => {
      const conn = open.result;

      const trx = conn.transaction("changes");
      trx.oncomplete = () => {}; // nice
      trx.onerror = mapError("Cannot read changes from storage");

      const changes: DB.Change[] = [];
      const cursor = trx.objectStore("changes").openCursor();
      cursor.onsuccess = () => {
        if (cursor.result) {
          if (typeof cursor.result.key === "string")
            changes.push([cursor.result.key, cursor.result.value]);
          cursor.result.continue();
        } else {
          // Finished loading
          DB.atomic(db, (trx) => {
            changes.forEach(([key, val]) => DB.put(trx, key, val));
          });
          resolve();
        }
      };

      DB.listen(
        db,
        batch((changes) => {
          const trx = conn.transaction("changes", "readwrite");
          trx.oncomplete = () => {}; // nice
          // TODO: this error will not display, because the promise has already resolved
          trx.onerror = mapError("Cannot write changes to storage");

          const store = trx.objectStore("changes");
          // TODO: iterator helpers
          for (const [key, val] of changes) {
            if (val === undefined) store.delete(key);
            else store.put(val, key);
          }
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
  // Map errors to a standard format
  const mapError = (message: string) => (err: unknown) => {
    const cause = err instanceof Error ? err : undefined;
    throw new Error(`StorageError: Extension[${areaName}]: ${message}`, {
      cause,
    });
  };

  // @ts-ignore
  const browser: Browser = require("webextension-polyfill");
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
    .catch(mapError("Cannot read changes from storage"));

  // Setup listener
  const listener = batch((changes) => {
    // TODO: test for both updates and deletes for the same key
    // TODO: iterator helpers
    const changesArray = Array.from(changes);
    const updates = Object.fromEntries(
      changesArray
        .filter(([, val]) => val !== undefined)
        .map(([key, val]) => [`${name}/${key}`, val]),
    );
    const deletes = changesArray
      .filter(([, val]) => val === undefined)
      .map(([key]) => `${name}/${key}`);

    storageArea.set(updates).catch(mapError("Cannot write updates to storage"));
    storageArea
      .remove(deletes)
      .catch(mapError("Cannot write deletes to storage"));
  });
  DB.listen(db, listener);
};

const batch = (
  flush: (batch: Iterable<DB.Change>) => void,
  timeout = 0,
): DB.Listener => {
  const changes = new Map();
  let timer: number | null = null;

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
