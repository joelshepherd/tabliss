import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { CustomInput } from 'reactstrap';

const TimeSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="TimeSettings">
    <CustomInput
      id="timeSettingAnalog"
      type="radio"
      checked={data.mode === 'analogue'}
      onChange={() => setData({ ...data, mode: 'analogue' })}
      label="Analogue"
    />

    <CustomInput
      id="timeSetting12Digital"
      type="radio"
      checked={data.mode === 'digital' && data.hour12}
      onChange={() => setData({ ...data, mode: 'digital', hour12: true })}
      label="12-hour digital"
    />

    <CustomInput
      id="timeSetting24Digital"
      type="radio"
      checked={data.mode === 'digital' && !data.hour12}
      onChange={() => setData({ ...data, mode: 'digital', hour12: false })}
      label="24-hour digital"
    />

    <br />

    <CustomInput
      id="timeSettingSeconds"
      type="checkbox"
      checked={data.showSeconds}
      onChange={() => setData({ ...data, showSeconds: !data.showSeconds })}
      label="Display seconds"
    />

    <CustomInput
      id="timeSettingMinutes"
      type="checkbox"
      checked={data.showMinutes}
      onChange={() => setData({ ...data, showMinutes: !data.showMinutes })}
      label="Display minutes"
    />

    <CustomInput
      id="timeSettingDate"
      type="checkbox"
      checked={data.showDate}
      onChange={() => setData({ ...data, showDate: !data.showDate })}
      label="Display the date"
    />
  </div>
);

export default TimeSettings;
