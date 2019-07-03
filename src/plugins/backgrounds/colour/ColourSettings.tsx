import React from 'react';

import { Props, defaultData } from './types';

const ColourSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="ColourSettings">
    <label>
      Colour
      <input
        type="color"
        value={data.colour}
        onChange={event => setData({ colour: event.target.value })}
      />
    </label>
  </div>
);

export default ColourSettings;
