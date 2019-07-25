import alertTriangle from 'feather-icons/dist/icons/alert-triangle.svg';
import React, { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { Icon } from './icons';

const Crashed: FC<FallbackProps> = () => (
  <div className="Crashed">
    <p>
      <Icon svg={alertTriangle} /> Sorry this plugin has crashed!
    </p>
  </div>
);

export default Crashed;
