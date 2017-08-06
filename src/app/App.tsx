import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Route, Router } from 'react-router';
import { Dashboard } from './Dashboard';
import { Settings } from './Settings';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div className="App">
          <Dashboard />
          <Route path="/settings" component={Settings} />
        </div>
      </Router>
    );
  }
}

export default App;
