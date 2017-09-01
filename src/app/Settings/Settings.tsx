import * as React from 'react';
import { connect } from 'react-redux';
import Background from './Background';
import Feedback from './Feedback';
import Widgets from './Widgets';
import { resetDashboard, toggleSettings } from '../../data';
import './Settings.css';

const logo = require('../../logo.svg');

interface Props {
  resetDashboard: () => void;
  toggleSettings: () => void;
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
          <h1 dangerouslySetInnerHTML={{__html: logo}} />

          <Background />
          <Widgets />
          <Feedback />

          <p><a href="javascript:;" onClick={this.props.resetDashboard}>
            Reset to default
          </a></p>

          <p><a href="https://tabliss.io/" target="_blank">tabliss.io</a></p>
        </div>
      </div>
    );
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.props.toggleSettings();
    }
  }
}

const mapDispatchToProps = { resetDashboard, toggleSettings };

export default connect(null, mapDispatchToProps)(Settings);
