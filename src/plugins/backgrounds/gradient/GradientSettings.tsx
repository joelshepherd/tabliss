import React, { FC } from 'react';

import { Props, defaultData } from './types';

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GradientSettings">
    <label>
      From Colour
      <input
        type="color"
        value={data.from}
        onChange={event => setData({ ...data, from: event.target.value })}
      />
    </label>

    <label>
      To Colour
      <input
        type="color"
        value={data.to}
        onChange={event => setData({ ...data, to: event.target.value })}
      />
    </label>

    <label>
      Angle (0-360)
      <input
        type="number"
        value={data.angle}
        onChange={event =>
          setData({ ...data, angle: Number(event.target.value) })
        }
      />
    </label>
  </div>
);

export default GradientSettings;
