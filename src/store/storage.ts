import localForage from 'localforage';
import { syncStorage } from 'redux-persist-webextension-storage';

function createCacheStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver: localForage.INDEXEDDB,
    storeName: 'cache',
  });
}

function createDataStorage() {
  return process.env.BUILD_TARGET === 'web'
    ? localForage.createInstance({
        name: 'tabliss',
        driver: localForage.LOCALSTORAGE,
        storeName: 'data',
      })
    : syncStorage;
}

export function createStorage() {
  const cacheStorage = createCacheStorage();
  const dataStorage = createDataStorage();

  return { cacheStorage, dataStorage };
}
