import { CacheActions } from './cache';
import { ProfileActions } from './profile';
import { ProfilesActions } from './profiles';
import { SettingsActions } from './settings';
import { UiActions } from './ui';

export * from './cache';
export * from './profile';
export * from './profiles';
export * from './settings';
export * from './ui';

export type Actions =
  | CacheActions
  | ProfileActions
  | ProfilesActions
  | SettingsActions
  | UiActions;
