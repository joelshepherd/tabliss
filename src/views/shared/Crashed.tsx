import React, { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { Icon } from './icons';

const Crashed: FC<FallbackProps> = () => (
  <div className="Crashed">
    <Icon name="alert-triangle" /> Sorry this plugin has crashed!
  </div>
);

export default Crashed;
