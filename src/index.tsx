import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './data/store';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
