import React, { FC } from 'react';

import IntlTime from './IntlTime'

type Props = {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  time: Date;
};

const Digital: FC<Props> = ({ time, hour12, showMinutes, showSeconds }) => (
  <div className="Time Digital">
    <h1>
      <IntlTime time={time} hour12={hour12} showMinutes={showMinutes} showSeconds={showSeconds} />
    </h1>
  </div>
);

export default Digital;
