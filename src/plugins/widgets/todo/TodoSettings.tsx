import React, { FC } from 'react';

import { Props, defaultData } from './types';

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <p>
      <label>
        Tasks to show
        <input
          type="number"
          min="0"
          onChange={event =>
            setData({ ...data, show: Number(event.target.value) })
          }
          placeholder="Number of todo items to show"
          value={data.show}
        />
      </label>
    </p>

    <p>
      <label>
        <input
          type="radio"
          checked={data.textAlign === 'inherit'}
          onChange={() => setData({ ...data, textAlign: 'inherit' })}
        />
        Default text align
      </label>

      <label>
        <input
          type="radio"
          checked={data.textAlign === 'left'}
          onChange={() => setData({ ...data, textAlign: 'left' })}
        />
        Left text align
      </label>
    </p>
  </div>
);

export default TodoSettings;
