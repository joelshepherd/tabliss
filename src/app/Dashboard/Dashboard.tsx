import * as React from 'react';
import Background from './Background';
import Overlay from './Overlay';
import Widgets from './Widgets';
import './Dashboard.css';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <Background />
        <Overlay />
        <Widgets />
      </div>
    );
  }
}

export default Dashboard;
