import React, { FC } from 'react';
import { FormattedDate } from 'react-intl';

import { useTime } from '../../../utils/useTime';
import Analogue from './Analogue';
import Digital from './Digital';
import { Props, defaultData } from './types';
import './Time.sass';

const Time: FC<Props> = ({ data = defaultData }) => {
  const { hour12, mode, showDate, showMinutes, showSeconds } = data;
  const time = useTime();

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
        />
      )}

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
