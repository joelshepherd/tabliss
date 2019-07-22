import { combineReducers } from 'redux';
import { persistReducer, Storage } from 'redux-persist';

import { capture as captureException } from '../../errorHandler';
import { setStoreError } from '../actions';
import { createStorage } from '../storage';
import { store } from '../store';
import { cache } from './cache';
import { settings } from './settings';
import { profile } from './profile';
import { ui } from './ui';

function writeFailHandler(err: Error) {
  captureException(err);
  store.dispatch(setStoreError(err));
}

const { cacheStorage, localStorage, syncStorage } = createStorage();

const config = (key: string, storage: Storage) => ({
  key,
  storage,
  deserialize: false,
  serialize: false,
  throttle: 250,
  writeFailHandler: key !== 'cache' ? writeFailHandler : undefined,
});

export default combineReducers({
  ui,
  cache: persistReducer(config('cache', cacheStorage), cache),
  profile: persistReducer(config('profile', syncStorage), profile),
  settings: persistReducer(config('settings', localStorage), settings),
});
