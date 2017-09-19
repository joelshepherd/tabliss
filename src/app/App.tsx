import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransition from 'react-transition-group/CSSTransition';
import { RootState } from '../data';
import { Dashboard } from './Dashboard';
import { Settings } from './Settings';
import './App.sass';

interface Props {
  settings: boolean;
}

const App: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="App">
      <Dashboard />

      <CSSTransition
        classNames="slide"
        in={props.settings}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={250}
      >
        <Settings />
      </CSSTransition>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { settings: state.ui.settings };
};

export default connect(mapStateToProps)(App);
