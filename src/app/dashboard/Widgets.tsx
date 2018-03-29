import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../data';
import Plugin from './Plugin';
import './Widgets.sass';

interface Props {
  focus: boolean;
  widgets: string[];
}

const Widgets: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {! props.focus && props.widgets.map(key => <Plugin key={key} pluginKey={key} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  focus: state.ui.focus,
  widgets: state.dashboard.widgets,
});

export default connect(mapStateToProps)(Widgets);
