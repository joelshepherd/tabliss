import React, { FC } from 'react';
import InputGroup from '../../../views/shared/bootstrap/InputGroup';

import { defaultData, Props } from './types';

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GradientSettings">
    <InputGroup
      type="color"
      label="From Colour"
      value={data.from}
      onChange={event => setData({ ...data, from: event.target.value })}
    />

    <InputGroup
      type="color"
      label="To Colour"
      value={data.to}
      onChange={event => setData({ ...data, to: event.target.value })}
    />

    <InputGroup
      type="number"
      value={data.angle}
      label="Angle (0-360)"
      onChange={event =>
        setData({ ...data, angle: Number(event.target.value) })
      }
    />
  </div>
);

export default GradientSettings;
