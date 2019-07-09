import React, { FC, useMemo } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { configureStore } from './store';

const StoreProvider: FC = ({ children }) => {
  const { persistor, store } = useMemo(configureStore, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
