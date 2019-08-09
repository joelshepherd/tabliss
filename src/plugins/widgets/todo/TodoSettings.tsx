import React, { FC, ChangeEvent } from 'react';

import integrations from './integrations/integrations';
import { Props, defaultData } from './types';

const confirmIntegrationChange = () =>
  confirm(
    'Changing your integration will remove all current tasks.' +
      'Are you sure you want to continue?',
  );

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const integration = integrations.find(
    ({ key }) => key === data.integration.provider,
  );

  const handleIntegrationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (confirmIntegrationChange()) {
      setData({
        ...data,
        items: [],
        integration: { provider: event.target.value || undefined },
      });
    }
  };

  return (
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

      <label>
        Integration
        <select
          value={data.integration.provider || ''}
          onChange={handleIntegrationChange}
        >
          <option value="">None</option>
          {integrations.map(({ key, name }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </label>

      {integration && (
        <integration.settingsComponent
          data={data.integration.data}
          setData={integrationData =>
            setData({
              ...data,
              integration: { ...data.integration, data: integrationData },
            })
          }
        />
      )}
    </div>
  );
};

export default TodoSettings;
