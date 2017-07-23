import * as React from 'react';
import { Link } from 'react-router-dom';
import './Overlay.css';


class Overlay extends React.Component {
  render() {
    return (
      <div className="Overlay">
        <Link to="/settings">Settings</Link>
      </div>
    );
  }
}

export default Overlay;
