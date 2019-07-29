import React, { FC, StrictMode } from 'react';

import TimeProvider from './context/time';
import IntlProvider from './locales/IntlProvider';
import StoreProvider from './store/StoreProvider';
import App from './App';

const Root: FC = () => (
  <StrictMode>
    <StoreProvider>
      <IntlProvider>
        <TimeProvider>
          <App />
        </TimeProvider>
      </IntlProvider>
    </StoreProvider>
  </StrictMode>
);

export default Root;
