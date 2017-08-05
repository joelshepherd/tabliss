import { combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import * as localForage from 'localforage';
import { booted, dashboard, plugins, version } from './reducers';
import { State } from './interfaces';

// Create store
export const store = createStore<State>(
  combineReducers({
    booted,
    dashboard,
    plugins,
    version,
  }),
  autoRehydrate(),
);

// Setup localForage
localForage.config({
  name: 'start',
  storeName: 'state',
});

// Begin periodically persisting the store
export const persistor = persistStore(store, {
  blacklist: ['booted'],
  debounce: 100,
  keyPrefix: '',
  serialize: false,
  storage: localForage,
});
