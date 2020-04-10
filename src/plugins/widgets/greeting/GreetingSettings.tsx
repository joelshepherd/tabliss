import React, { FC } from 'react';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';

const GreetingSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GreetingSettings">
    <InputGroup
      type="text"
      label="Name"
      value={data.name}
      onChange={event => setData({ name: event.target.value })}
    />
  </div>
);

export default GreetingSettings;
