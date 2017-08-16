import * as React from 'react';
import { connect } from 'react-redux';
import Background from './Background';
import Feedback from './Feedback';
import System from './System';
import Widgets from './Widgets';
import { reset, toggleSettings } from '../../data';
import './Settings.css';

interface Props {
  reset: () => void;
  toggleSettings: () => void;
}

class Settings extends React.Component<Props> {
  render() {
    return (
      <div className="Settings content">
        <a onClick={this.props.toggleSettings} className="overlay" />

        <div className="plane">
          <a onClick={this.props.toggleSettings}>
            <i className="fa fa-times" />
          </a>

          <h2>Settings</h2>

          <Background />
          <Widgets />
          <System />
          <Feedback />

          <p><button onClick={this.props.reset}>
            Reset to default
          </button></p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  reset,
  toggleSettings,
};

export default connect(null, mapDispatchToProps)(Settings);
