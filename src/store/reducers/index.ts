import { combineReducers } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';

import { createStorage } from '../storage';
import { cache } from './cache';
import { settings } from './settings';
import { profile } from './profile';
import { ui } from './ui';

const { cacheStorage, localStorage, syncStorage } = createStorage();

const config = (
  key: string,
  storage: PersistConfig['storage'],
): PersistConfig => ({
  key,
  storage,
  serialize: false,
});

export default combineReducers({
  ui,
  cache: persistReducer(config('cache', cacheStorage), cache),
  profile: persistReducer(config('profile', syncStorage), profile),
  settings: persistReducer(config('settings', localStorage), settings),
});
