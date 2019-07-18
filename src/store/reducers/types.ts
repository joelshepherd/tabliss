import { CacheState } from './cache';
import { ProfilesState } from './profiles';
import { SettingsState } from './settings';
import { UiState } from './ui';

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
