import { Database, put, listen } from "./db";
import LocalForage from "localforage";

/**
 * LocalStorage adapter for database.
 */
export const local = (db: Database, name: string) => {
  // push changes from storage
  const push = ([key, raw]: [string, string | null]) => {
    // TODO: allow codecs
    try {
      const val = raw === null ? null : JSON.parse(raw);
      put(db, key, val);
    } catch (err) {
      // TODO: Error reporting
    }
  };

  Object.keys(localStorage)
    .map((key: string) => key.split("/"))
    .filter(([prefix]) => prefix === name)
    .map(([, ...parts]) => parts.join("/"))
    .map(
      (key) =>
        [key, localStorage.getItem(name + "/" + key)] as [
          string,
          string | null,
        ],
    )
    .forEach(push);

  // watch for storage changes
  addEventListener("storage", (event) => {
    if (localStorage === localStorage && event.key) {
      const [prefix = null, ...parts] = event.key.split("/");
      if (prefix === name) push([parts.join("/"), event.newValue]);
    }
  });

  // listen to db changes
  listen(db, ([key, val]) => {
    if (val === null) localStorage.removeItem(name + "/" + key);
    else localStorage.setItem(name + "/" + key, JSON.stringify(val));
  });
};

/**
 * localForage storage adapter.
 */
export const localForage = (db: Database, instance: LocalForage) => {
  instance.iterate((val, key) => put(db, key, val));

  // watch for storage changes
  // TODO: Watch for changes (possibly with BroadcastChannel)

  // listen to db changes
  listen(db, ([key, val]) => {
    if (val === null) instance.removeItem(key);
    else instance.setItem(key, val);
  });
};
