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
import { createStorage } from './storage';

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

// Typed `useSelector` hook
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;

export function configureStore() {
  const { localStorage, syncStorage } = createStorage();

  const cacheConfig = {
    key: 'cache',
    serialize: false,
    storage: localStorage,
  };

  const profileConfig = {
    key: 'profile',
    serialize: false,
    storage: syncStorage,
  };

  const localConfig = {
    key: 'settings',
    serialize: false,
    storage: localStorage,
  };

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
