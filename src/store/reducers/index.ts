import { createStorage } from '../storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { cache } from './cache';
import { settings } from './settings';
import { profiles } from './profiles';
import { ui } from './ui';
import reduceReducers from 'reduce-reducers';
import { applyProfile } from './applyProfile';

const { localStorage, syncStorage } = createStorage();

const cacheConfig = {
  key: 'cache',
  serialize: false,
  storage: localStorage,
};

const profilesConfig = {
  key: 'profiles',
  serialize: false,
  storage: syncStorage,
  whitelist: ['profiles'],
};

const localConfig = {
  key: 'settings',
  serialize: false,
  storage: localStorage,
};

const reducer = reduceReducers(
  combineReducers({
    cache: persistReducer(cacheConfig, cache),
    profiles,
    settings: persistReducer(localConfig, settings),
    ui,
  }) as any,
  applyProfile as any,
);

export default persistReducer(profilesConfig, reducer);
