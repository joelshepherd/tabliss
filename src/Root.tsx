import React from 'react';

import StoreProvider from './store/StoreProvider';
import IntlProvider from './locales/IntlProvider';
import App from './App';

const Root = () => (
  <StoreProvider>
    <IntlProvider>
      <App />
    </IntlProvider>
  </StoreProvider>
);

export default Root;
