import React, { FC } from 'react';

import { Props, defaultData } from './types';

const TimerSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="TimerSettings">
    <label>
      Timer Name
      <input
        type="text"
        value={data.name}
        onChange={(event) => setData({ ...data, name: event.target.value })}
      />
    </label>
    <label>
      Timer Expiry Date
      <input
        type="date"
        min={new Date().toISOString().split('T')[0]}
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        value={data.date}
        onChange={(event) => setData({ ...data, date: event.target.value })}
      />
    </label>
    {/* <label>
      Timer Expiry Date
      <input
        type="time"
        value={data.time}
        onChange={(event) => setData({ name: event.target.value })}
      />
    </label> */}
  </div>
);

export default TimerSettings;
