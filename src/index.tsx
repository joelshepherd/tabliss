import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createHashHistory } from 'history';
import { App } from './app';
import registerServiceWorker from './registerServiceWorker';
import { store } from './data/store';

import 'normalize.css';
import './index.css';

const history = createHashHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
