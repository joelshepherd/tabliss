import { createStore, combineReducers } from 'redux';
import {
  TypedUseSelectorHook,
  useSelector as baseUseSelector,
} from 'react-redux';

import { ProfileState, profile } from './reducers/profile';
import { SettingsState, settings } from './reducers/settings';
import { UiState, ui } from './reducers/ui';

export type RootState = {
  // This gets synced
  profile: ProfileState;

  // Settings saved in the browser
  settings: SettingsState;

  // Controlled the user interface
  ui: UiState;
};

export const store = createStore(
  combineReducers({
    profile,
    settings,
    ui,
  }),
);

export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
