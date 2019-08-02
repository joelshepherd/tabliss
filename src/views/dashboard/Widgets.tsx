import React, { FC } from 'react';

import { useSelector } from '../../store';
import { WidgetPosition, WidgetState } from '../../store/reducers/types';
import Slot from './Slot';
import './Widgets.sass';

const Widgets: FC = () => {
  const focus = useSelector(state => state.ui.focus);
  const widgets = useSelector(state => state.data.widgets);

  const grouped = widgets.reduce<Record<string, WidgetState[]>>(
    (carry, widget) => ({
      ...carry,
      [widget.display.position]: [
        ...(carry[widget.display.position] || []),
        widget,
      ],
    }),
    {},
  );

  const slots = Object.entries(grouped);

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus &&
          slots.map(([position, widgets]) => (
            <Slot
              key={position}
              position={position as WidgetPosition}
              widgets={widgets}
            />
          ))}
      </div>
    </div>
  );
};

export default Widgets;
