import React, { FC } from 'react';

import { Props, defaultData } from './types';
import AsanaSettings from './integrations/asana/AsanaSettings';

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div>
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

    <AsanaSettings
      data={data.integration.data}
      setData={integrationData =>
        setData({
          ...data,
          integration: { ...data.integration, data: integrationData },
        })
      }
    />
  </div>
);

export default TodoSettings;
