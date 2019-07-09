import React, { FC } from 'react';

import Background from './Background';
import Overlay from './Overlay';
import Widgets from './Widgets';
import './Dashboard.sass';

const Dashboard: FC = () => (
  <div className="Dashboard fullscreen">
    <Background />
    <Overlay />
    <Widgets />
  </div>
);

export default Dashboard;
