import React from 'react';
import { connect } from 'react-redux';

import Plugin from '../../containers/Plugin';
import { RootState } from '../../data';

type Props = { type: string };

const Background: React.FC<Props> = props => <Plugin {...props} />;

const mapStateToProps = (state: RootState) => ({
  type: state.dashboard.background,
});

export default connect(mapStateToProps)(Background);
