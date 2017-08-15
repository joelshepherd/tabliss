import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Background from './Background';
import Feedback from './Feedback';
import System from './System';
import Widgets from './Widgets';
import { reset } from '../../data';
import './Settings.css';

interface Props {
  reset: () => void;
}

class Settings extends React.Component<Props> {
  render() {
    return (
      <div className="Settings content">
        <Link to="/" className="overlay" />

        <div className="plane">
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

const mapDispatchToProps = { reset };

export default connect(null, mapDispatchToProps)(Settings);
