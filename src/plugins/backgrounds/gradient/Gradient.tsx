import React, { FC } from 'react';

import Backdrop from '../../../views/shared/Backdrop';
import { Props, defaultData } from './types';

const Gradient: FC<Props> = ({ data = defaultData }) => (
  <Backdrop
    className="Gradient fullscreen"
    style={{
      backgroundImage: `${data.type}(${data.angle}deg, ${data.from}, ${
        data.to
      })`,
    }}
  />
);

export default Gradient;
