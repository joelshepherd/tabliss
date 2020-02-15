import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { FormGroup, Label, Input } from 'reactstrap';

const ColourSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <FormGroup>
    <Label htmlFor="backgroundColorSelector">Colour</Label>
    <Input
      id="backgroundColorSelector"
      type="color"
      value={data.colour}
      onChange={event => setData({ colour: event.target.value })}
    />
  </FormGroup>
);

export default ColourSettings;
