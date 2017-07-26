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

// @TODO This is merging arrays instead of replacing them, for some reason.
const load = storage.createLoader(engine);
load(store)
  .then(
    (state) => console.log('Loaded state:', state),
    () => console.log('Failed to load previous state'),
  );

// Dev mode = activated!
store.subscribe(() => console.log(store.getState()));
console.log(store.getState());
