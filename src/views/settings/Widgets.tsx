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
import { CustomInput, FormGroup } from 'reactstrap';
import DnD from '../shared/DnD';
import Widget from './Widget';

const Widgets: FC = () => {
  const active = useSelector((state) => state.data.widgets);

  const dispatch = useDispatch();
  const boundReorderWidget = useCallback(
    (id: string, to: number) => dispatch(reorderWidget(id, to)),
    [dispatch],
  );

  const handleAddWidget = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addWidget(event.target.value));
  };

  return (
    <div className="WidgetsSettings">
      <h2>
        <FormattedMessage
          id="widgets"
          defaultMessage="Widgets"
          description="Widgets title"
        />
      </h2>

      <FormGroup>
        <CustomInput
          value=""
          type="select"
          id="addWidgetSelector"
          onChange={handleAddWidget}
        >
          <option disabled value="">
            Add a new widget
          </option>
          {widgetConfigs.map((plugin) => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name}
            </option>
          ))}
        </CustomInput>
      </FormGroup>

      <DnD
        move={boundReorderWidget}
        items={active}
        template={(widget) => (
          <Widget
            key={widget.id}
            plugin={widget}
            onRemove={() => dispatch(removeWidget(widget.id))}
          />
        )}
      />
    </div>
  );
};

export default Widgets;
