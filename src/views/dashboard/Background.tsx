import React, { FC } from 'react';

import { getConfig } from '../../plugins';
import { useSelector } from '../../store';
import Plugin from '../shared/Plugin';

const Background: FC = () => {
  const background = useSelector(state =>
    state.data.backgrounds.find(plugin => plugin.active),
  );

  if (!background) return null;

  const { dashboardComponent } = getConfig(background.key);

  return (
    <div className="Background">
      <Plugin id={background.id} component={dashboardComponent} />
    </div>
  );
};

export default Background;
