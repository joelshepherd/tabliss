import * as React from 'react';
import { FormattedTime } from 'react-intl';

interface Props {
  hour12: boolean;
  time: Date;
}

const Digital: React.StatelessComponent<Props> = ({ time, hour12 }) => {
  return (
    <div className="Time Digital">
      <h1>
        <FormattedTime value={time} hour12={hour12} />
      </h1>
    </div>
  );
};

export default Digital;
