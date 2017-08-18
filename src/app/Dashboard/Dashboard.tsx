import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../data';
import Background from './Background';
import Overlay from './Overlay';
import Widgets from './Widgets';
import './Dashboard.css';

interface Props {
  booted: boolean;
}

class Dashboard extends React.Component<Props> {
  render() {
    return (
      <div className={'Dashboard' + (this.props.booted ? ' booted' : '')}>
        <Background />
        <Widgets />
        <Overlay />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    booted: state.booted,
  };
};

export default connect(mapStateToProps)(Dashboard);
