import localForage from 'localforage';
import {
  local as localDriver,
  sync as syncDriver,
} from 'localforage-webextensionstorage-driver';

if (process.env.BUILD_TARGET !== 'web') {
  localForage.defineDriver(localDriver);
  localForage.defineDriver(syncDriver);
}

function createCacheStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver: localForage.INDEXEDDB,
    storeName: 'cache',
  });
}

function createLocalStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver:
      process.env.BUILD_TARGET === 'web'
        ? localForage.LOCALSTORAGE
        : localDriver._driver,
    storeName: 'local',
  });
}

function createSyncStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver:
      process.env.BUILD_TARGET === 'web'
        ? localForage.LOCALSTORAGE
        : syncDriver._driver,
    storeName: 'sync',
  });
}

export function createStorage() {
  const cacheStorage = createCacheStorage();
  const localStorage = createLocalStorage();
  const syncStorage = createSyncStorage();

  return { cacheStorage, localStorage, syncStorage };
}
