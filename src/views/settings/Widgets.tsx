import React, { FC, useCallback, ChangeEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { widgetConfigs } from '../../plugins';
import { useSelector } from '../../store';
import {
  addWidget,
  removeWidget,
  reorderWidget,
} from '../../store/actions/data';
import Widget from './Widget';
import WidgetsDnD from './WidgetsDnD';

const Widgets: FC = () => {
  const active = useSelector(state => state.data.widgets);

  const dispatch = useDispatch();
  const boundReorderWidget = useCallback(
    (id: string, to: number) => dispatch(reorderWidget(id, to)),
    [dispatch],
  );

  const handleAddWidget = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(addWidget(event.target.value));
  };

  return (
    <div>
      <h2>
        <FormattedMessage
          id="widgets"
          defaultMessage="Widgets"
          description="Widgets title"
        />
      </h2>

      <label>
        <select value="" onChange={handleAddWidget} className="primary">
          <option disabled value="">
            Add a new widget
          </option>
          {widgetConfigs.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name}
            </option>
          ))}
        </select>
      </label>

      {active.length === 0 && <p>No widgets selected.</p>}
      <WidgetsDnD
        widgets={active}
        moveWidget={boundReorderWidget}
        removeWidget={id => dispatch(removeWidget(id))}
      />
      {/* {active.map((plugin, index) => (
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
      ))} */}
    </div>
  );
};

export default Widgets;
