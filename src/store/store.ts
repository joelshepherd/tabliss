import {
  TypedUseSelectorHook,
  useSelector as baseUseSelector,
} from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

import reducers from './reducers';
import { RootState } from './reducers/types';

// Typed `useSelector` hook
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;

export function configureStore() {
  const store = createStore(reducers);
  const persistor = persistStore(store);

  return { store, persistor };
}
