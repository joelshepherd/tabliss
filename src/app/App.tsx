import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import * as CSSTransition from 'react-transition-group/CSSTransition';
import { RootState } from '../data';
import { Dashboard } from './dashboard';
import { Settings } from './settings';
import './App.sass';

interface Props {
  settings: boolean;
}

const messages = defineMessages({
  pageTitle: {
    id: 'app.pageTitle',
    description: 'Page title that Tabliss displays in the title bar.',
    defaultMessage: 'New Tab',
  },
});

class App extends React.PureComponent<Props & InjectedIntlProps> {
  componentWillMount() {
    document.title = this.props.intl.formatMessage(messages.pageTitle);
  }

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

export default connect(mapStateToProps)(injectIntl<Props>(App));
