import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import * as reducers from './reducers';
import { State } from './state';

const reducer = storage.reducer(
  combineReducers<State>(reducers as any)
);
const engine = createEngine('state');

const middleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
export const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);
load(store)
  .then(
    (newState) => console.log('Loaded state:', newState),
    () => console.log('Failed to load previous state'),
  );

// Dev mode = activated!
store.subscribe(() => console.log(store.getState()));
console.log(store.getState());
