import React, { FC } from 'react';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <InputGroup
      type="number"
      min="0"
      onChange={event => setData({ ...data, show: Number(event.target.value) })}
      placeholder="Number of todo items to show"
      value={data.show}
    >
      Tasks to show
    </InputGroup>
  </div>
);

export default TodoSettings;
