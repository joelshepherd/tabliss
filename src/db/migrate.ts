import { Browser } from "webextension-polyfill";
import { DB } from "../lib";
import { importStore } from "./actions";
import { db, ready } from "./state";

/** Check and migrate data */
export const migrate = (): void => {
  ready.then(
    process.env.BUILD_TARGET === "web" ? migrateWeb : migrateExtension,
  );
};

/** Migrate extension data */
const migrateExtension = async () => {
  const key = "persist:data";
  const browser = require("webextension-polyfill") as Browser;
  const stored = await browser.storage.sync.get(key);
  if (stored[key]) {
    // Migrate if new database is empty
    if (db.cache.size === 0) {
      importStore(stored[key]);
      clearDangling();
      // TODO: consider migrating uploaded images
    }
    browser.storage.sync.remove(key);
  }
};

/** Migrate web data */
const migrateWeb = () => {
  const key = "tabliss/data/persist:data";
  const data = localStorage.getItem(key);
  if (data) {
    // Migrate if new database is empty
    if (db.cache.size === 0) {
      try {
        importStore(JSON.parse(data));
        clearDangling();
        // TODO: consider migrating uploaded images
      } catch {}
    }
    localStorage.removeItem(key);
    indexedDB.deleteDatabase("tabliss");
  }
};

/** Find and remove dangling data stored from previous versions */
const clearDangling = (): void => {
  const used = new Set<string>();
  used.add(DB.get(db, "background").id);
  for (const [, val] of DB.prefix(db, "widget/")) {
    if (val !== null) used.add(val.id);
  }
  for (const [key] of DB.prefix(db, "data/")) {
    if (!used.has(key.substring(5))) DB.del(db, key);
  }
};
