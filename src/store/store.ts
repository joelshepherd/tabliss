import { createStore, combineReducers } from 'redux';

import { ProfilesState, profiles } from './reducers/profiles';
import { SettingsState, settings } from './reducers/settings';

export type RootState = {
  // This gets synced
  profiles: ProfilesState;

  // Settings saved in the browser
  settings: SettingsState;

  // Controlled the user interface
  ui: {
    focus: boolean;
    pending: number;
    settings: boolean;
  };
};

export const store = createStore(
  combineReducers({
    profiles,
    settings,
  }),
);
