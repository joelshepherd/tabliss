import React, { FC } from 'react';

import { get } from '../../plugins';
import { useProfile } from '../../store';
import Plugin from '../shared/Plugin';

const Background: FC = () => {
  const background = useProfile(profile =>
    profile.backgrounds.find(plugin => plugin.active),
  );

  if (!background) return null;

  const { Dashboard } = get(background.type);

  // @todo Apply darken and blur

  return (
    <div className="Background">
      <Plugin id={background.id} Component={Dashboard} />
    </div>
  );
};

export default Background;
