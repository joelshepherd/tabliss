import React from 'react';

import Plugin from '../../containers/Plugin';
import { useSelector } from '../../store/store';
import './Widgets.sass';

const Widgets: React.FC = () => {
  const { focus, widgets } = useSelector(state => ({
    focus: state.ui.focus,
    widgets: state.profile.widgets,
  }));

  // @todo How to store the state and draw the widget slots

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus && widgets.map(({ id }) => <Plugin key={id} id={id} />)}
      </div>
    </div>
  );
};

export default Widgets;
