import { createStore, combineReducers } from 'redux';
import {
  TypedUseSelectorHook,
  useSelector as baseUseSelector,
} from 'react-redux';

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

export const store = createStore(
  combineReducers({
    cache,
    profile,
    settings,
    ui,
  }),
);

export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
