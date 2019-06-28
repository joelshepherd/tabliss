import React from 'react';

import Plugin from '../../containers/Plugin';
import { useSelector } from '../../store/store';
import './Widgets.sass';
import { getPlugin } from '../../plugins';

const Widgets: React.FC = () => {
  const { focus, widgets } = useSelector(state => ({
    focus: state.ui.focus,
    widgets: state.profile.plugins.filter(
      plugin => plugin.position === 'widget',
    ),
  }));

  // @todo How to store the state and draw the widget slots

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus &&
          widgets.map(({ id, type, data }) => (
            <Plugin
              key={id}
              id={id}
              Component={getPlugin(type).Dashboard}
              data={data}
            />
          ))}
      </div>
    </div>
  );
};

export default Widgets;
