import localForage from 'localforage';
import { sync as syncDriver } from 'localforage-webextensionstorage-driver';

if (process.env.BUILD_TARGET !== 'web') {
  localForage.defineDriver(syncDriver);
}

function createCacheStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver: localForage.INDEXEDDB,
    storeName: 'cache',
  });
}

function createDataStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver:
      process.env.BUILD_TARGET === 'web'
        ? localForage.LOCALSTORAGE
        : syncDriver._driver,
    storeName: 'data',
  });
}

export function createStorage() {
  const cacheStorage = createCacheStorage();
  const dataStorage = createDataStorage();

  return { cacheStorage, dataStorage };
}
