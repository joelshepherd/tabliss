import React, { FC } from 'react';

import { Props, defaultData } from './types';
import TimeZoneInput from '../../../views/shared/timeZone/TimeZoneInput';

const TimeSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="TimeSettings">
    <label>
      Name
      <input
        type="text"
        value={data.name}
        placeholder="Optional name"
        onChange={(event) => setData({ ...data, name: event.target.value })}
      />
    </label>
    <label>
      <label>
        Time Zone
        <TimeZoneInput
          timeZone={data.timeZone}
          onChange={(timeZone) => setData({ ...data, timeZone })}
        />
      </label>
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

    {data.mode === 'digital' && data.hour12 && (
      <label>
        <input
          type="checkbox"
          checked={data.showDayPeriod}
          onChange={() =>
            setData({ ...data, showDayPeriod: !data.showDayPeriod })
          }
        />{' '}
        Display AM / PM
      </label>
    )}
  </div>
);

export default TimeSettings;
