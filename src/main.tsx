import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './data';

// Setup error logging
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_PUBLIC_DSN) {
  require('raven-js').config(process.env.SENTRY_PUBLIC_DSN, {
    release: '1.7.2',
  }).install();
}

// Render app into root element
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// Register service worker on web
if (process.env.BUILD_TARGET === 'web') {
  require('./serviceWorker').register();
}
