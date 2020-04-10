import React, { FC } from 'react';
import InputGroup from '../../../views/shared/bootstrap/InputGroup';

import { defaultData, Props } from './types';

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GradientSettings">
    <InputGroup
      type="color"
      value={data.from}
      onChange={event => setData({ ...data, from: event.target.value })}
    >
      From Colour
    </InputGroup>

    <InputGroup
      type="color"
      value={data.to}
      onChange={event => setData({ ...data, to: event.target.value })}
    >
      To Colour
    </InputGroup>

    <InputGroup
      type="number"
      value={data.angle}
      onChange={event =>
        setData({ ...data, angle: Number(event.target.value) })
      }
    >
      Angle (0-360)
    </InputGroup>
  </div>
);

export default GradientSettings;
