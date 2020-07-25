import React, { FC } from 'react';
import { FormattedDate } from 'react-intl';

import { useTime } from '../../../hooks';
import Analogue from './Analogue';
import Digital from './Digital';
import { Props, defaultData } from './types';
import './Time.sass';
import { utcToZonedTime } from 'date-fns-tz';

const Time: FC<Props> = ({ data = defaultData }) => {
  const {
    hour12,
    mode,
    name,
    showDate,
    showMinutes,
    showSeconds,
    timeZone,
    showDayPeriod = true,
  } = data;
  let time = useTime(timeZone ? 'absolute' : 'zoned');

  if (timeZone) {
    time = utcToZonedTime(time, timeZone);
  }

  return (
    <div className="Time">
      {mode === 'analogue' ? (
        <Analogue
          time={time}
          showMinutes={showMinutes}
          showSeconds={showSeconds}
        />
      ) : (
        <Digital
          time={time}
          hour12={hour12}
          showMinutes={showMinutes}
          showSeconds={showSeconds}
          showDayPeriod={showDayPeriod}
        />
      )}
      {name && <h2>{name}</h2>}

      {showDate && (
        <>
          <hr />
          <h3>
            <FormattedDate
              value={time}
              day="numeric"
              month="long"
              weekday="long"
            />
          </h3>
        </>
      )}
    </div>
  );
};

export default Time;
