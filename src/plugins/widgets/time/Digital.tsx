import * as React from 'react';
import { FormattedTime } from 'react-intl';

interface Props {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  time: Date;
}

const Digital: React.StatelessComponent<Props> = ({ time, hour12, showMinutes, showSeconds }) => (
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
