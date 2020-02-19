import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { FormGroup, Label, Input } from 'reactstrap';

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <FormGroup>
      <Label>Tasks to show</Label>
      <Input
        type="number"
        min="0"
        onChange={event =>
          setData({ ...data, show: Number(event.target.value) })
        }
        placeholder="Number of todo items to show"
        value={data.show}
      />
    </FormGroup>
  </div>
);

export default TodoSettings;
