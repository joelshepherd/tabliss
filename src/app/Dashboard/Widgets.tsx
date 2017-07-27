import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../data';
import Widget from './Widget';
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
          <Widget key={key} id={key} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    focus: state.dashboard.focus,
    widgets: state.dashboard.widgets,
  };
};

export default connect(mapStateToProps, {})(Widgets);
