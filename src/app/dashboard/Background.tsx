import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../data';
import Plugin from './Plugin';

interface Props {
  pluginKey: string;
}

const Background: React.StatelessComponent<Props> = (props) => (
  <Plugin pluginKey={props.pluginKey} />
);

const mapStateToProps = (state: RootState) => ({
  pluginKey: state.dashboard.background,
});

export default connect(mapStateToProps)(Background);
