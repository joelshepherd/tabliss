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

const storage = localForage.createInstance({
  name: 'tabliss',
  driver: localForage.INDEXEDDB,
  storeName: 'storage',
});

const cacheConfig = {
  key: 'cache',
  serialize: false,
  storage,
};

const profileConfig = {
  key: 'profile',
  serialize: false,
  storage,
};

const localConfig = {
  key: 'settings',
  serialize: false,
  storage,
};

export const store = createStore(
  combineReducers({
    cache: persistReducer(cacheConfig, cache),
    profile: persistReducer(profileConfig, profile),
    settings: persistReducer(localConfig, settings),
    ui,
  }),
);

export const persistor = persistStore(store);

export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
