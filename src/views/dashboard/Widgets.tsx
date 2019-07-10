import groupBy from 'lodash-es/groupBy';
import React, { FC } from 'react';

import { useSelector } from '../../store/store';
import { WidgetPosition } from '../../store/reducers/profile';
import Slot from './Slot';
import './Widgets.sass';

const Widgets: FC = () => {
  const { focus, widgets } = useSelector(state => ({
    focus: state.ui.focus,
    widgets: state.profile.widgets,
  }));

  const groups = Object.entries(
    groupBy(widgets, widget => widget.display.position),
  );

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus &&
          groups.map(([position, widgets]) => (
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
