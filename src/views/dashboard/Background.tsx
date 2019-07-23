import React, { FC } from 'react';

import { get } from '../../plugins';
import { useSelector } from '../../store';
import Plugin from '../shared/Plugin';

const Background: FC = () => {
  const background = useSelector(state =>
    state.data.backgrounds.find(plugin => plugin.active),
  );

  if (!background) return null;

  const { Dashboard } = get(background.type);

  return (
    <div className="Background">
      <Plugin id={background.id} Component={Dashboard} />
    </div>
  );
};

export default Background;
