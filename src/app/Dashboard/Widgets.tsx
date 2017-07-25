import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../data';
import Widget from './Widget';
import './Widgets.css';

interface Props {
  widgets: any[];
}

class Widgets extends React.Component<Props> {
  render() {
    return (
      <div className="Widgets">
        {this.props.widgets.map(key =>
          <Widget key={key} id={key} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    widgets: state.dashboard.widgets,
  };
}

export default connect(mapStateToProps, {})(Widgets);
