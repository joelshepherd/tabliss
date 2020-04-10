import React, { FC } from 'react';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <InputGroup
      min="0"
      type="number"
      value={data.show}
      label="Tasks to show"
      placeholder="Number of todo items to show"
      onChange={event => setData({ ...data, show: Number(event.target.value) })}
    />
  </div>
);

export default TodoSettings;
