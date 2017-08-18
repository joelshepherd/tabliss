import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../data';
import Plugin from './Plugin';

interface Props {
  pluginKey: string;
}

class Background extends React.Component<Props> {
  render() {
    return <Plugin pluginKey={this.props.pluginKey} />;
  }
}

const mapStateToProps = (state: State) => {
  return {
    pluginKey: state.dashboard.background,
  };
};

export default connect(mapStateToProps)(Background);
