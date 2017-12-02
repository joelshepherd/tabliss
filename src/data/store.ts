import { combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import * as localForage from 'localforage';
import { booted, dashboard, storage, version, ui } from './reducers';
import { RootState } from './interfaces';

// Create store
export const store = createStore<RootState>(
  combineReducers({
    booted,
    dashboard,
    storage,
    version,
    ui,
  }),
  autoRehydrate(),
);

// Setup localForage
localForage.config({
  name: 'tabliss',
  storeName: 'state',
});

// Begin periodically persisting the store
export const persistor = persistStore(store, {
  debounce: 100,
  keyPrefix: '',
  serialize: false,
  storage: localForage,
  transforms: [
    createBlacklistFilter('booted'),
    createBlacklistFilter('ui', ['pending', 'settings']),
  ],
});
