import * as DB from "./db";
import * as Stream from "./stream";

/** IndexedDB storage provider */
// TODO: clean up indexeddb usage, convert to promises and double check error handling
export const indexeddb = (
  db: DB.Database,
  name: string,
): Promise<Stream.Stream<StorageError>> => {
  // Map idb errors to a standard format
  const mapError = (message: string, err: unknown): StorageError => {
    const cause =
      err instanceof Event &&
      err.target instanceof IDBRequest &&
      err.target.error instanceof Error
        ? err.target.error
        : undefined;
    return new StorageError(`IndexedDB: ${name}: ${message}`, { cause });
  };

  return new Promise((resolve, reject) => {
    const rejectError = (message: string) => (err: unknown) => {
      reject(mapError(message, err));
    };

    const open = indexedDB.open(name, 1);
    open.onerror = rejectError("Cannot open database");
    open.onupgradeneeded = () => {
      open.result.createObjectStore("changes");
    };
    open.onsuccess = () => {
      const conn = open.result;

      const trx = conn.transaction("changes", "readonly");
      trx.onerror = rejectError("Cannot read changes from store");

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

          // Write
          const errors = Stream.init<StorageError>();
          DB.listen(
            db,
            batch((changes) => {
              if (DEV) console.log("Storage: saving changes:", changes);

              const trx = conn.transaction("changes", "readwrite");
              trx.oncomplete = () => {}; // nice
              trx.onerror = (error) =>
                Stream.publish(
                  errors,
                  mapError("Cannot write changes to store", error),
                );

              const store = trx.objectStore("changes");
              // TODO: iterator helpers
              for (const [key, val] of changes) {
                if (val === undefined) store.delete(key);
                else store.put(val, key);
              }
            }),
          );
          resolve(errors);
        }
      };
    };
  });
};

/** Web Extension storage provider */
export const extension = async (
  db: DB.Database,
  name: string,
  area: "local" | "sync" | "managed",
): Promise<Stream.Stream<StorageError>> => {
  // Map errors to a standard format
  const mapError = (message: string, err: unknown) =>
    new StorageError(`Extension[${area}]: ${name}: ${message}`, {
      cause: err instanceof Error ? err : undefined,
    });

  const storageArea = browser.storage[area];

  // Pull
  await storageArea
    .get()
    .then((stored) =>
      Object.keys(stored)
        .filter((key) => key.startsWith(name))
        .forEach((key) =>
          DB.put(db, key.substring(name.length + 1), stored[key]),
        ),
    )
    .catch((error) => {
      throw mapError("Cannot read from storage", error);
    });

  // Push
  const errors = Stream.init<StorageError>();
  const handleError = (message: string) => (err: unknown) => {
    Stream.publish(errors, mapError(message, err));
  };
  DB.listen(
    db,
    batch((changes) => {
      if (DEV) console.log("Storage: saving changes:", changes);

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

      storageArea
        .set(updates)
        .catch(handleError("Cannot write updates to storage"));
      storageArea
        .remove(deletes)
        .catch(handleError("Cannot write deletes to storage"));
    }),
  );

  return errors;
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

/** Storage Error */
class StorageError extends Error {
  override name = "StorageError";
}
