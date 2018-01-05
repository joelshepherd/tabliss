import * as React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import { App } from './app';
import { store } from './data';
import { locale, messages } from './locales';
import { register as registerErrorHandler } from './errorHandler';
import { register as registerServiceWorker } from './serviceWorker';

// Register error handler
if (process.env.NODE_ENV === 'production') {
  registerErrorHandler();
}

// Render app into root element
render(
  <StoreProvider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  </StoreProvider>,
  document.getElementById('root'),
);

// Register service worker on web
if (process.env.NODE_ENV === 'production' && process.env.BUILD_TARGET === 'web') {
  registerServiceWorker();
}
