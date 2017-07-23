import * as React from 'react';
import { Route } from 'react-router';
import { Dashboard } from './Dashboard';
import { Settings } from './Settings';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
        <Route path="/settings" component={Settings} />
      </div>
    );
  }
}

export default App;
