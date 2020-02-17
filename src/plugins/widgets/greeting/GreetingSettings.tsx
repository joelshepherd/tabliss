import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { Label, Input } from 'reactstrap';

const GreetingSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GreetingSettings">
    <Label>Name</Label>
    <Input
      type="text"
      value={data.name}
      onChange={event => setData({ name: event.target.value })}
    />
  </div>
);

export default GreetingSettings;
