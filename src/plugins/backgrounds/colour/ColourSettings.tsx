import React, { FC } from 'react';
import { defaultData, Props } from './types';
import { InputGroup } from '../../../views/shared';

const ColourSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <InputGroup
    id="backgroundColorSelector"
    type="color"
    value={data.colour}
    onChange={(event) => setData({ colour: event.target.value })}
    label="Colour"
  />
);

export default ColourSettings;
