import React from 'react';

import Plugin from '../../containers/Plugin';
import { useSelector } from '../../store/store';
import Overlay from './Overlay';
import './Dashboard.sass';
import Widgets from './Widgets';

const Dashboard: React.FC = () => {
  const id = useSelector(state => state.profile.background.id);

  return (
    <div className="Dashboard fullscreen booted">
      <Plugin id={id} />
      <Overlay />
      <Widgets />
    </div>
  );
};

export default Dashboard;
