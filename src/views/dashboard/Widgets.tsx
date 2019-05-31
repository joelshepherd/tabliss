import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../data';
import Plugin from '../../containers/Plugin';
import './Widgets.sass';

type Props = {
  focus: boolean;
  widgets: string[];
};

const Widgets: React.StatelessComponent<Props> = ({ focus, widgets }) => {
  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus && widgets.map(type => <Plugin key={type} type={type} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  focus: state.ui.focus,
  widgets: state.dashboard.widgets,
});

export default connect(mapStateToProps)(Widgets);
