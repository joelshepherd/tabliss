import groupBy from 'lodash-es/groupBy';
import React from 'react';

import { useSelector } from '../../store/store';
import Slot from './Slot';
import './Widgets.sass';

const Widgets: React.FC = () => {
  const { focus, widgets } = useSelector(state => ({
    focus: state.ui.focus,
    widgets: state.profile.plugins.filter(
      plugin => plugin.position !== 'background',
    ),
  }));

  const groups = Object.entries(groupBy(widgets, widget => widget.position));

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus &&
          groups.map(([position, widgets]) => (
            <Slot key={position} position={position as any} widgets={widgets} />
          ))}
      </div>
    </div>
  );
};

export default Widgets;
