import { CacheState } from './cache';
import { SettingsState } from './settings';
import { UiState } from './ui';
import { ProfileState } from './profile';

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
