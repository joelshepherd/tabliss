import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ActionCreator, connect } from 'react-redux';
import Background from './Background';
import Feedback from './Feedback';
import Homepage from './Homepage';
import System from './System';
import Widgets from './Widgets';
import { Action, resetDashboard, toggleSettings } from '../../data';
import { githubIcon, globeIcon, twitterIcon } from '../ui';
import './Settings.sass';
const logo = require('./logo.svg');
const ESCAPE_KEY = 27;

interface Props {
  resetDashboard: ActionCreator<Action>;
  toggleSettings: ActionCreator<Action>;
}

class Settings extends React.PureComponent<Props> {
  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <div className="Settings">
        <a onClick={this.props.toggleSettings} className="fullscreen" />

        <div className="plane">
          <h1><i dangerouslySetInnerHTML={{__html: logo}} /></h1>

          <Background />

          <Widgets />

          <System />

          {process.env.BUILD_TARGET === 'firefox' && <Homepage />}

          <Feedback />

          <p>
            <a href="https://www.paypal.me/tabliss" target="_blank" rel="noopener noreferrer">
              Love Tabliss? Donate 😍
            </a>
          </p>

          <p><a onClick={this.reset}>Reset to default</a></p>

          <p>
            <a href="https://tabliss.io/" target="_blank">
              {globeIcon}
            </a>
            &nbsp;&nbsp;
            <a href="https://twitter.com/tabliss" target="_blank" rel="noopener noreferrer">
              {twitterIcon}
            </a>
            &nbsp;&nbsp;
            <a href="https://github.com/joelshepherd/tabliss" target="_blank" rel="noopener noreferrer">
              {githubIcon}
            </a>
          </p>

          <FormattedMessage
            id="settings.translationCredits"
            description="Give yourself some credit :)"
            defaultMessage=" "
            tagName="p"
          />
        </div>
      </div>
    );
  }

  private reset = () => {
    if (confirm('Are you sure you want to erase all your settings and reset to default?')) {
      this.props.resetDashboard();
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === ESCAPE_KEY) {
      this.props.toggleSettings();
    }
  }
}

const mapDispatchToProps = { resetDashboard, toggleSettings };

export default connect(null, mapDispatchToProps)(Settings);
