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
import WidgetsDnD from './WidgetsDnD';
import { CustomInput } from 'reactstrap';

const Widgets: FC = () => {
  const active = useSelector(state => state.data.widgets);

  const dispatch = useDispatch();
  const boundReorderWidget = useCallback(
    (id: string, to: number) => dispatch(reorderWidget(id, to)),
    [dispatch],
  );

  const handleAddWidget = (event: ChangeEvent<HTMLInputElement>) => {
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

      <CustomInput
        value=""
        type="select"
        id="addWidgetSelector"
        onChange={handleAddWidget}
      >
        <option disabled value="">
          Add a new widget
        </option>
        {widgetConfigs.map(plugin => (
          <option key={plugin.key} value={plugin.key}>
            {plugin.name}
          </option>
        ))}
      </CustomInput>

      {active.length === 0 && <p className="my-3">No widgets added.</p>}
      <WidgetsDnD
        widgets={active}
        moveWidget={boundReorderWidget}
        removeWidget={id => dispatch(removeWidget(id))}
      />
    </div>
  );
};

export default Widgets;
