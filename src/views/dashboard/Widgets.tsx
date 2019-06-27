import React from 'react';
import { useSelector } from 'react-redux';

import Plugin from '../../containers/Plugin';
import { RootState } from '../../store/store';
import { activeProfile } from '../../store/selectors/activeProfile';
import './Widgets.sass';

const Widgets: React.FC = () => {
  const { focus, widgets } = useSelector((state: RootState) => ({
    focus: state.ui.focus,
    widgets: activeProfile(state).widgets,
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
