import { CacheActions } from './cache';
import { ProfileActions } from './profile';
import { SettingsActions } from './settings';
import { UiActions } from './ui';

export type Actions =
  | CacheActions
  | ProfileActions
  | SettingsActions
  | UiActions;
