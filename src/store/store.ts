import { createStore, combineReducers } from 'redux';
import {
  TypedUseSelectorHook,
  useSelector as baseUseSelector,
} from 'react-redux';

import { ProfilesState, profiles } from './reducers/profiles';
import { SettingsState, settings } from './reducers/settings';
import { UiState, ui } from './reducers/ui';

export type RootState = {
  // This gets synced
  profiles: ProfilesState;

  // Settings saved in the browser
  settings: SettingsState;

  // Controlled the user interface
  ui: UiState;
};

export const store = createStore(
  combineReducers({
    profiles,
    settings,
    ui,
  }),
);

export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
