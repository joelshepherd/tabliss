import localForage from "localforage";
import { syncStorage } from "redux-persist-webextension-storage";

export const cacheStorage = localForage.createInstance({
  name: "tabliss",
  driver: localForage.INDEXEDDB,
  storeName: "cache",
});

export const dataStorage =
  process.env.BUILD_TARGET === "web"
    ? localForage.createInstance({
        name: "tabliss",
        driver: localForage.LOCALSTORAGE,
        storeName: "data",
      })
    : syncStorage;
