import { Database, put, listen } from "./db";
import LocalForage from "localforage";
import { Browser } from "webextension-polyfill";

if (false) {
}

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
    .filter((key) => key.startsWith(name))
    .map(
      (key) =>
        [key.substring(name.length + 1), localStorage.getItem(key)] as [
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

export const extension = (
  db: Database,
  name: string,
  areaName: "local" | "sync" | "managed",
): void => {
  const browser = require("webextension-polyfill") as Browser;
  const area = browser.storage[areaName];

  // load from storage on init
  // TODO: the promise causes the db to use blank data to begin with
  //       need some sort of ready indicator
  area
    .get()
    .then((stored) =>
      Object.keys(stored)
        .filter((key) => key.startsWith(name))
        .forEach((key) => put(db, key.substring(name.length + 1), stored[key])),
    )
    .catch((err) => {
      // TODO: error handling
      throw err;
    });

  // watch for storage changes
  browser.storage.onChanged.addListener((changes, changeArea) => {
    if (changeArea === areaName)
      Object.keys(changes)
        .filter((key) => key.startsWith(name))
        .forEach((key) =>
          put(db, key.substring(name.length + 1), changes[key].newValue),
        );
  });

  // listen to db changes
  listen(db, ([key, val]) => {
    if (val === null)
      area.remove(name + "/" + key).catch((err) => {
        throw err;
      });
    else
      area.set({ [name + "/" + key]: val }).catch((err) => {
        throw err;
      });
  });
};
