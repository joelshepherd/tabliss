import React from 'react';

import { Props, defaultData } from './types';

const GreetingSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GreetingSettings">
    <label>
      Name
      <input
        type="text"
        value={data.name}
        onChange={event => setData({ name: event.target.value })}
      />
    </label>
  </div>
);

export default GreetingSettings;
