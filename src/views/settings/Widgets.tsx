import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { widgetConfigs } from '../../plugins';
import { useSelector } from '../../store';
import {
  addWidget,
  removeWidget,
  reorderWidget,
} from '../../store/actions/data';
import Widget from './Widget';
import { FormattedMessage } from 'react-intl';

const Widgets: FC = () => {
  const active = useSelector(state => state.data.widgets);

  const dispatch = useDispatch();
  const boundAddWidget = useCallback(
    (type: string) => dispatch(addWidget(type)),
    [dispatch],
  );
  const boundReorderWidget = useCallback(
    (id: string, to: number) => dispatch(reorderWidget(id, to)),
    [dispatch],
  );

  return (
    <div>
      <h3>
        <FormattedMessage
          id="widgets"
          defaultMessage="Widgets"
          description="Widgets title"
        />
      </h3>

      <label>
        <select
          value={''}
          onChange={event => boundAddWidget(event.target.value)}
          className="primary"
        >
          <option value={''}>Add a new widget</option>
          {widgetConfigs.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name} - {plugin.description}
            </option>
          ))}
        </select>
      </label>

      {active.length === 0 && <p>No widgets selected.</p>}
      {active.map((plugin, index) => (
        <Widget
          key={plugin.id}
          plugin={plugin}
          onMoveUp={
            index !== 0
              ? () => boundReorderWidget(plugin.id, index - 1)
              : undefined
          }
          onMoveDown={
            index !== active.length - 1
              ? () => boundReorderWidget(plugin.id, index + 1)
              : undefined
          }
          onRemove={() => dispatch(removeWidget(plugin.id))}
        />
      ))}
    </div>
  );
};

export default Widgets;
