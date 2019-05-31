import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../data';
import Background from './Background';
import Overlay from './Overlay';
import Widgets from './Widgets';
import './Dashboard.sass';

type Props = { booted: boolean };

const Dashboard: React.StatelessComponent<Props> = ({ booted }) => {
  if (!booted) {
    return <div className="Dashboard fullscreen" />;
  }

  return (
    <div className="Dashboard fullscreen booted">
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ booted: state.booted });

export default connect(mapStateToProps)(Dashboard);
