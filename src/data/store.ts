import { combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import localForage from 'localforage';
import { booted, dashboard, settings, storage, version, ui } from './reducers';

// Create store
export const store = createStore(
  combineReducers({
    booted,
    dashboard,
    settings,
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
