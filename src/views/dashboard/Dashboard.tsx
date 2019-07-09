import React, { FC } from 'react';

import Plugin from '../../components/plugin/Plugin';
import { getPlugin } from '../../plugins';
import { useSelector } from '../../store/store';
import Overlay from './Overlay';
import Widgets from './Widgets';
import './Dashboard.sass';

const Dashboard: FC = () => {
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
