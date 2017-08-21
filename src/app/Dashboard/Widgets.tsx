import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../data';
import Plugin from './Plugin';
import './Widgets.css';

interface Props {
  focus: boolean;
  toggleFocus: () => void;
  widgets: string[];
}

class Widgets extends React.Component<Props> {
  render() {
    return (
      <div className="Widgets">
        {! this.props.focus && this.props.widgets.map(key =>
          <Plugin key={key} pluginKey={key} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    focus: state.ui.focus,
    widgets: state.dashboard.widgets,
  };
};

export default connect(mapStateToProps)(Widgets);
