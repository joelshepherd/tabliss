import React, { FC } from 'react';

import { Props, defaultData } from './types';

const ReloadSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="ReloadSettings">
    <label>
      Time between refreshes (minutes)
      <input
        type="number"
        min="1"
        max="300"
        value={data.timeout}
        onChange={event => setData({ timeout: Number(event.target.value) })}
      />
    </label>
  </div>
);

export default ReloadSettings;
