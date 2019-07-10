import React, { FC, StrictMode } from 'react';

import IntlProvider from './locales/IntlProvider';
import StoreProvider from './store/StoreProvider';
import App from './App';

const Root: FC = () => (
  <StrictMode>
    <StoreProvider>
      <IntlProvider>
        <App />
      </IntlProvider>
    </StoreProvider>
  </StrictMode>
);

export default Root;
