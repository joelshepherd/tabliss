import localForage from 'localforage';
import {
  TypedUseSelectorHook,
  useSelector as baseUseSelector,
} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { CacheState, cache } from './reducers/cache';
import { ProfileState, profile } from './reducers/profile';
import { SettingsState, settings } from './reducers/settings';
import { UiState, ui } from './reducers/ui';
import storage from 'redux-persist/es/storage';

export type RootState = {
  // This is not synced
  cache: CacheState;

  // This gets synced
  profile: ProfileState;

  // Settings saved in the browser
  settings: SettingsState;

  // Controlled the user interface
  ui: UiState;
};

const localStorage = localForage.createInstance({
  name: 'tabliss',
  driver: localForage.INDEXEDDB,
  storeName: 'local',
});

// const syncStorage = localForage.createInstance({
//   name: 'tabliss',
//   driver: localForage.INDEXEDDB, // Or sync storage in web extensions
//   storeName: 'sync',
// });
const syncStorage = storage;

const cacheConfig = {
  key: 'cache',
  serialize: false,
  storage: localStorage,
  timeout: 0, // Test to see if this fixes the freezing thing: https://github.com/rt2zz/redux-persist/issues/717
};

const profileConfig = {
  key: 'profile',
  serialize: true,
  storage: syncStorage,
  timeout: 0,
};

const localConfig = {
  key: 'settings',
  serialize: false,
  storage: localStorage,
  timeout: 0,
};

export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;

export function configureStore() {
  const store = createStore(
    combineReducers({
      cache: persistReducer(cacheConfig, cache),
      profile: persistReducer(profileConfig, profile),
      settings: persistReducer(localConfig, settings),
      ui,
    }),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
