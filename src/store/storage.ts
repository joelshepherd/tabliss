import localForage from 'localforage';
import { sync as syncDriver } from 'localforage-webextensionstorage-driver';

if (process.env.BUILD_TARGET !== 'web') {
  localForage.defineDriver(syncDriver);
}

function createLocalStorage() {
  return localForage.createInstance({
    name: 'tabliss',
    driver: localForage.INDEXEDDB,
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
  const localStorage = createLocalStorage();
  const syncStorage = createSyncStorage();

  return { localStorage, syncStorage };
}
