import React, { FC } from 'react';

import { Props, defaultData } from './types';

const TimeSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="TimeSettings">
    <label>
      <input
        type="radio"
        checked={data.mode === 'analogue'}
        onChange={() => setData({ ...data, mode: 'analogue' })}
      />{' '}
      Analogue
    </label>

    <label>
      <input
        type="radio"
        checked={data.mode === 'digital' && data.hour12}
        onChange={() => setData({ ...data, mode: 'digital', hour12: true })}
      />{' '}
      12-hour digital
    </label>

    <label>
      <input
        type="radio"
        checked={data.mode === 'digital' && !data.hour12}
        onChange={() => setData({ ...data, mode: 'digital', hour12: false })}
      />{' '}
      24-hour digital
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showSeconds}
        onChange={() => setData({ ...data, showSeconds: !data.showSeconds })}
      />{' '}
      Display seconds
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showMinutes}
        onChange={() => setData({ ...data, showMinutes: !data.showMinutes })}
      />{' '}
      Display minutes
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showDate}
        onChange={() => setData({ ...data, showDate: !data.showDate })}
      />{' '}
      Display the date
    </label>
  </div>
);

export default TimeSettings;
