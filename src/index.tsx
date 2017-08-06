import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './data/store';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
