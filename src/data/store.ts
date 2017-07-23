import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

export const store = createStore(
  combineReducers(reducers as any)
  // @TODO Load state from storage
);

// Dev mode = activated!
store.subscribe(() => console.log(store.getState()));
console.log(store.getState());
