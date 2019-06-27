import React from 'react';
import { useSelector } from 'react-redux';

import Plugin from '../../containers/Plugin';
import { activeProfile } from '../../store/selectors/activeProfile';
import Overlay from './Overlay';
import './Dashboard.sass';
import Widgets from './Widgets';

const Dashboard: React.FC = () => {
  const profile = useSelector(activeProfile);

  return (
    <div className="Dashboard fullscreen booted">
      <Plugin id={profile.background.id} />
      <Overlay />
      <Widgets />
    </div>
  );
};

export default Dashboard;
