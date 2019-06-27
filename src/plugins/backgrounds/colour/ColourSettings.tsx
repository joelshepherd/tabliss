import React from 'react';

import { Props } from './types';

const ColourSettings: React.FC<Props> = ({
  data: { colour = '#3498db' },
  setData,
}) => (
  <div className="ColourSettings">
    <label>
      Colour
      <input
        type="color"
        value={colour}
        onChange={event => setData({ colour: event.target.value })}
      />
    </label>
  </div>
);

export default ColourSettings;
