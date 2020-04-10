import React, { FC } from 'react';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';

const GreetingSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GreetingSettings">
    <InputGroup
      type="text"
      value={data.name}
      onChange={event => setData({ name: event.target.value })}
    >
      Name
    </InputGroup>
  </div>
);

export default GreetingSettings;
