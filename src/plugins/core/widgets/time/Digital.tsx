import { DateTime } from 'luxon';
import * as React from 'react';

interface Props {
  hour12: boolean;
  time: DateTime;
}

const TIME_12_SIMPLE = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
};

const Digital: React.StatelessComponent<Props> = ({ time, hour12 }) => {
  return (
    <div className="Time Digital">
      <h1>
        {time.toLocaleString(hour12
          ? TIME_12_SIMPLE
          : DateTime.TIME_24_SIMPLE
        )}
      </h1>
    </div>
  );
};

export default Digital;
