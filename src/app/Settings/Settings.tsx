import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Background from './Background';
import Widgets from './Widgets';
import { resetSettings } from '../../data';
import './Settings.css';

interface Props {
  resetSettings: () => void;
}

class Settings extends Component<Props> {
  render() {
    return (
      <div className="Settings">
        <Link to="/" className="overlay" />

        <div className="plane">
          <h2>Settings</h2>

          <Background />
          <Widgets />

          <a href="javascript:;" onClick={this.props.resetSettings}>Reset all settings</a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  resetSettings,
}

export default connect(null, mapDispatchToProps)(Settings);
