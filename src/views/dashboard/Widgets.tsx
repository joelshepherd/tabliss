import React from 'react';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Plugin from '../../containers/Plugin';
import './Widgets.sass';

type Props = {
  focus: boolean;
  widgets: string[];
};

const Widgets: React.StatelessComponent<Props> = () => {
  const { focus, widgets } = useSelector((state: RootState) => ({
    focus: state.ui.focus,
    widgets: state.profiles.profiles[0].widgets,
  }));

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus && widgets.map(({ id }) => <Plugin key={id} id={id} />)}
      </div>
    </div>
  );
};

export default Widgets;