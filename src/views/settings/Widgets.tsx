import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { WIDGET_PLUGINS } from '../../plugins';
import { useSelector } from '../../store';
import { addWidget, removeWidget } from '../../store/actions/profile';
import Widget from './Widget';

const Widgets: FC = () => {
  const active = useSelector(state => state.profile.widgets);
  const dispatch = useDispatch();
  const boundAddWidget = useCallback(
    (type: string) => dispatch(addWidget(type)),
    [dispatch],
  );

  return (
    <div>
      <h3>Widgets</h3>
      <label>
        <select
          value={''}
          onChange={event => boundAddWidget(event.target.value)}
          className="primary"
        >
          <option value={''}>Add a new widget</option>
          {WIDGET_PLUGINS.map(plugin => (
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
          onMoveUp={index !== 0 ? undefined : undefined}
          onMoveDown={index !== active.length - 1 ? undefined : undefined}
          onRemove={() => dispatch(removeWidget(plugin.id))}
        />
      ))}
    </div>
  );
};

export default Widgets;
