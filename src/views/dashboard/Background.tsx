import React, { FC } from 'react';

import Plugin from '../../components/plugin/Plugin';
import { getPlugin } from '../../plugins';
import { useSelector } from '../../store/store';

const Background: FC = () => {
  const background = useSelector(state =>
    state.profile.backgrounds.find(plugin => plugin.active),
  );

  if (!background) return null;

  // @todo Apply darken and blur

  return (
    <div className="Background">
      <Plugin
        id={background.id}
        Component={getPlugin(background.type).Dashboard}
      />
    </div>
  );
};

export default Background;
