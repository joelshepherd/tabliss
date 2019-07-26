import featherIcons from 'feather-icons/dist/icons.json';
import React, { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { Icon } from './icons';

const Crashed: FC<FallbackProps> = () => (
  <div className="Crashed">
    <Icon svg={featherIcons['alert-triangle']} /> Sorry this plugin has crashed!
  </div>
);

export default Crashed;
