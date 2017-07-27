import { combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import * as localForage from 'localforage';
import { dashboard, plugins, version } from './reducers';
import { State } from './interfaces';

// Create store
export const store = createStore<State>(
  combineReducers({
    dashboard,
    plugins,
    version,
  }),
  autoRehydrate()
);

// Setup localForage
localForage.config({
  name: 'start',
  storeName: 'state',
});

// Begin periodically persisting the store
persistStore(store, {
  debounce: 500,
  keyPrefix: '',
  storage: localForage,
});
