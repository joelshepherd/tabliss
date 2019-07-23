import { combineReducers } from 'redux';
import { persistReducer, Storage } from 'redux-persist';

import { capture as captureException } from '../../errorHandler';
import { setStoreError } from '../actions';
import { createStorage } from '../storage';
import { store } from '../store';
import { cache } from './cache';
import { data } from './data';
import { ui } from './ui';

function writeFailHandler(err: Error) {
  captureException(err);
  store.dispatch(setStoreError(err));
}

const { cacheStorage, dataStorage } = createStorage();

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
  data: persistReducer(config('data', dataStorage), data),
});
