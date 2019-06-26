import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Plugin from '../../containers/Plugin';
import './Widgets.sass';
import { activeProfile } from '../../store/selectors/activeProfile';

type Props = {
  focus: boolean;
  widgets: string[];
};

const Widgets: React.StatelessComponent<Props> = () => {
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
