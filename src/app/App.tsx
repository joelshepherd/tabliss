import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../data';
import { Dashboard } from './Dashboard';
import { Settings } from './Settings';
import './App.css';

interface Props {
  settings: boolean;
}

class App extends React.Component<Props> {
  render() {
    return (
        <div className="App">
          <Dashboard />
          {this.props.settings && <Settings />}
        </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { settings: state.ui.settings };
};

export default connect(mapStateToProps)(App);
