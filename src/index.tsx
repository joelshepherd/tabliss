import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import { register as registerServiceWorker } from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
