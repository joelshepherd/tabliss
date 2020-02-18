import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { CustomInput } from 'reactstrap';

const TimeSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="TimeSettings">
    <CustomInput
      type="radio"
      label="Analogue"
      id="timeSettingAnalog"
      checked={data.mode === 'analogue'}
      onChange={() => setData({ ...data, mode: 'analogue' })}
    />

    <CustomInput
      type="radio"
      label="12-hour digital"
      id="timeSetting12Digital"
      checked={data.mode === 'digital' && data.hour12}
      onChange={() => setData({ ...data, mode: 'digital', hour12: true })}
    />

    <CustomInput
      type="radio"
      label="24-hour digital"
      id="timeSetting24Digital"
      checked={data.mode === 'digital' && !data.hour12}
      onChange={() => setData({ ...data, mode: 'digital', hour12: false })}
    />

    <br />

    <CustomInput
      type="checkbox"
      label="Display seconds"
      id="timeSettingSeconds"
      checked={data.showSeconds}
      onChange={() => setData({ ...data, showSeconds: !data.showSeconds })}
    />

    <CustomInput
      type="checkbox"
      label="Display minutes"
      id="timeSettingMinutes"
      checked={data.showMinutes}
      onChange={() => setData({ ...data, showMinutes: !data.showMinutes })}
    />

    <CustomInput
      type="checkbox"
      id="timeSettingDate"
      checked={data.showDate}
      label="Display the date"
      onChange={() => setData({ ...data, showDate: !data.showDate })}
    />
  </div>
);

export default TimeSettings;
