import React from 'react';

import { Props, defaultData } from './types';

const Gradient: React.FC<Props> = ({ data = defaultData }) => (
  <div
    className="Gradient fullscreen"
    style={{
      backgroundImage: `${data.type}(${data.angle}deg, ${data.from}, ${
        data.to
      })`,
    }}
  />
);

export default Gradient;
