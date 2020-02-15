import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { FormGroup, Label, Input } from 'reactstrap';

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GradientSettings">
    <FormGroup>
      <Label>From Colour</Label>

      <Input
        type="color"
        value={data.from}
        onChange={event => setData({ ...data, from: event.target.value })}
      />
    </FormGroup>

    <FormGroup>
      <Label>To Colour</Label>

      <Input
        type="color"
        value={data.to}
        onChange={event => setData({ ...data, to: event.target.value })}
      />
    </FormGroup>

    <FormGroup>
      <Label>Angle (0-360)</Label>

      <Input
        type="number"
        value={data.angle}
        onChange={event =>
          setData({ ...data, angle: Number(event.target.value) })
        }
      />
    </FormGroup>
  </div>
);

export default GradientSettings;
