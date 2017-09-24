import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './data/store';

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);

if (process.env.BUILD_TARGET === 'web') {
  require('./registerServiceWorker')();
}
