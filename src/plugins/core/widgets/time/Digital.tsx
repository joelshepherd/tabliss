import { DateTime } from 'luxon';
import * as React from 'react';

interface Props {
  hour12: boolean;
  time: DateTime;
}

const Digital: React.StatelessComponent<Props> = ({ time, hour12 }) => {
  return (
    <div className="Time Digital">
      <h1>
        {time.toLocaleString(hour12
          ? DateTime.TIME_SIMPLE
          : DateTime.TIME_24_SIMPLE
        )}
      </h1>
    </div>
  );
};

export default Digital;
