import React from 'react';
import { render } from 'react-dom';

import Root from './Root';
import { register as registerErrorHandler } from './errorHandler';
import { register as registerServiceWorker } from './serviceWorker';

// Register error handler
if (process.env.NODE_ENV === 'production') {
  registerErrorHandler();
}

// Render app into root element
render(<Root />, document.getElementById('root'));

// Register service worker on web
if (
  process.env.NODE_ENV === 'production' &&
  process.env.BUILD_TARGET === 'web'
) {
  registerServiceWorker();
}
