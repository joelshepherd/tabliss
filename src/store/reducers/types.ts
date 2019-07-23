import { CacheState } from './cache';
import { DataState } from './data';
import { UiState } from './ui';

export type RootState = {
  // This is not synced
  cache: CacheState;

  // This is synced
  data: DataState;

  // Controlled the user interface
  ui: UiState;
};
