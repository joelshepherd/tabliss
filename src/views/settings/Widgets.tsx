import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getPluginsByType, Type } from '../../plugins';
import { useSelector } from '../../store/store';
import { addWidget, removeWidget } from '../../store/actions/profile';
import Plugin from './Plugin';

const Widgets: FC = () => {
  const available = getPluginsByType(Type.WIDGET);

  const active = useSelector(state => state.profile.plugins);
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
          {available.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.title}
            </option>
          ))}
        </select>
      </label>

      {active.length === 0 && <p>No widgets selected.</p>}
      {active.map((plugin, index) => (
        <Plugin
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
