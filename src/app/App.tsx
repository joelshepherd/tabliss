import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransition from 'react-transition-group/CSSTransition';
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

          <CSSTransition
            classNames="slide"
            in={this.props.settings}
            mountOnEnter={true}
            unmountOnExit={true}
            timeout={250}
          >
            <Settings />
          </CSSTransition>
        </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { settings: state.ui.settings };
};

export default connect(mapStateToProps)(App);
