import React, { FC } from 'react';

import IntlTime from './IntlTime';

type Props = {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  showDayPeriod: boolean;
  time: Date;
};

const Digital: FC<Props> = (props) => (
  <div className="Time Digital">
    <h1>
      <IntlTime {...props} />
    </h1>
  </div>
);

export default Digital;
