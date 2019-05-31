import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { connect, Dispatch } from 'react-redux';

import { Action, RootState, setLocal, updateLocal } from '../data';
import { capture as captureException } from '../errorHandler';
import Crashed from '../components/crashed/Crashed';
import { getPlugin, Plugin as IPlugin, Settings, Local } from '../plugins';

interface OwnProps {
  type: string;
}

interface Props extends OwnProps {
  local: Local;
  plugin: IPlugin;
  settings: Settings;
  setLocal: (state: Local) => void;
  updateLocal: (state: Local) => void;
}

const Plugin: React.StatelessComponent<Props> = props => {
  return (
    <props.plugin.Dashboard
      {...props.settings}
      local={props.local}
      setLocal={props.setLocal}
      updateLocal={props.updateLocal}
    />
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  plugin: getPlugin(ownProps.type),
  settings: (state.storage[ownProps.type] || {}).settings,
  local: (state.storage[ownProps.type] || {}).local,
});

// Launching updates off-thread to prevent issues pushing state at hydration
const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: OwnProps,
) => ({
  setLocal: (state: Local) => {
    setImmediate(() => dispatch(setLocal(ownProps.type, state)));
  },
  updateLocal: (state: Local) => {
    setImmediate(() => dispatch(updateLocal(ownProps.type, state)));
  },
});

export default withErrorBoundary(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Plugin),
  Crashed,
  captureException,
);
