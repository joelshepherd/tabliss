import {
  TypedUseSelectorHook,
  useSelector as baseUseSelector,
} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { CacheState, cache } from './reducers/cache';
import { ProfilesState, profiles } from './reducers/profiles';
import { SettingsState, settings } from './reducers/settings';
import { UiState, ui } from './reducers/ui';
import { createStorage } from './storage';
import { ProfileState, profile } from './reducers/profile';
import reducers from './reducers';

export type RootState = {
  // This is not synced
  cache: CacheState;

  // This gets synced
  profiles: ProfilesState;

  // Settings saved in the browser
  settings: SettingsState;

  // Controlled the user interface
  ui: UiState;
};

// Typed `useSelector` hook
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;

export function useProfile<T>(selector: (profile: ProfileState) => T) {
  const state = useSelector(state => state);
  return selector(activeProfileSelector(state));
}

export function activeProfileSelector(state: RootState) {
  const profile = state.profiles.find(
    profile => profile.id === state.settings.profileId,
  );

  if (!profile) {
    throw new Error('Cannot find active profile');
  }

  return profile;
}

export function configureStore() {
  const store = createStore(reducers);
  const persistor = persistStore(store);

  return { store, persistor };
}
