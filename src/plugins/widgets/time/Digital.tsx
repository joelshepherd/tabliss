import React, { FC } from 'react';
import { FormattedTime } from 'react-intl';

type Props = {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  time: Date;
};

const Digital: FC<Props> = ({ time, hour12, showMinutes, showSeconds }) => (
  <div className="Time Digital">
    <h1>
      <FormattedTime
        value={time}
        hour12={hour12}
        hour="numeric"
        minute={showMinutes ? 'numeric' : undefined}
        second={showSeconds ? 'numeric' : undefined}
      />
    </h1>
  </div>
);

export default Digital;
