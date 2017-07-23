import * as React from 'react';
import { Link } from 'react-router-dom';
import Background from './Background';
import Widgets from './Widgets';
import './Settings.css';

export default class Settings extends React.Component {
  render() {
    return (
      <div className="Settings">
        <div className="Settings__plane">
          <Link to="/">Close</Link>
          <h2>Settings</h2>

          <Background />
          <Widgets />
        </div>
      </div>
    );
  }
}
