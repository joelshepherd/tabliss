import React, { FC } from 'react';

import { Props, defaultData } from './types';

const CountdownSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="CssSettings">
    <label>
      What
      <input
        type="text"
        value={data.title || ''}
        onChange={event => setData({ ...data, title: event.target.value })}
      />
    </label>

    <label>
      When
      <div>Some absolute time picker</div>
    </label>
  </div>
);

export default CountdownSettings;
