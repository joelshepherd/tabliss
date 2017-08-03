import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../data';
import Plugin from './Plugin';
import './Widgets.css';

interface Props {
  system: string[];
}

class System extends React.Component<Props> {
  render() {
    return (
      <div className="System">
        {this.props.system.map(key =>
          <Plugin key={key} pluginKey={key} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    system: state.dashboard.system,
  };
};

export default connect(mapStateToProps, {})(System);
