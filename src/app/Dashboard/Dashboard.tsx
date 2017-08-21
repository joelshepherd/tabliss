import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../data';
import Background from './Background';
import Overlay from './Overlay';
import Widgets from './Widgets';
import './Dashboard.css';

interface Props {
  booted: boolean;
}

const Dashboard: React.StatelessComponent<Props> = (props) => {
  return (
    <div className={'Dashboard' + (props.booted ? ' booted' : '')}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { booted: state.booted };
};

export default connect(mapStateToProps)(Dashboard);
