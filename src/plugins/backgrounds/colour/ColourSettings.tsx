import React, { FC } from 'react';
import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';


const ColourSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <InputGroup
    id="backgroundColorSelector"
    type="color"
    value={data.colour}
    onChange={event => setData({ colour: event.target.value })}
  >
    Colour
  </InputGroup>
);

export default ColourSettings;
