import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import * as localForage from 'localforage';
import { booted, dashboard, settings, storage, version, ui } from './reducers';
import { RootState } from './interfaces';

const combinedReducers = combineReducers<RootState>({
  booted,
  dashboard,
  settings,
  storage,
  version,
  ui,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    keyPrefix: '',
    serialize: false,
    storage: localForage,
    transforms: [
      createBlacklistFilter('booted'),
      createBlacklistFilter('ui', ['pending', 'settings']),
    ],
  },
  combinedReducers
);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

// Setup localForage
localForage.config({
  name: 'tabliss',
  storeName: 'state',
});

export { store, persistor };
