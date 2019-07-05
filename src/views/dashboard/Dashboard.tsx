import React from 'react';

import Plugin from '../../components/plugin/Plugin';
import { useSelector } from '../../store/store';
import Overlay from './Overlay';
import './Dashboard.sass';
import Widgets from './Widgets';
import { getPlugin } from '../../plugins';

const Dashboard: React.FC = () => {
  const background = useSelector(state =>
    state.profile.plugins.find(
      plugin => plugin.active && plugin.position === 'background',
    ),
  );

  return (
    <div className="Dashboard fullscreen booted">
      {background && (
        <Plugin
          id={background.id}
          Component={getPlugin(background.type).Dashboard}
        />
      )}
      <Overlay />
      <Widgets />
    </div>
  );
};

export default Dashboard;
