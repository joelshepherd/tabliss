import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { createStorage } from '../storage';
import { applyProfile } from './applyProfile';
import { cache } from './cache';
import { settings } from './settings';
import { profiles } from './profiles';
import { ui } from './ui';

const { localStorage, syncStorage } = createStorage();

const config = (
  key: string,
  storage: typeof localStorage | typeof syncStorage,
) => ({
  key,
  storage,
  serialize: false,
});

const root = combineReducers({
  profiles,
  ui,
  cache: persistReducer(config('cache', localStorage), cache),
  settings: persistReducer(config('settings', localStorage), settings),
});

// TypeScript cannot seem to figure this out
// The persist partials and reduce reducer's basic types seem to be the culprits
const reducer = reduceReducers(root as any, applyProfile as any);

export default persistReducer(
  { ...config('profiles', syncStorage), whitelist: ['profiles'] },
  reducer,
);
