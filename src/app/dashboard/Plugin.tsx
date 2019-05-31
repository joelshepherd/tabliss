import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { connect, Dispatch } from 'react-redux';
import { Action, RootState, setLocal, updateLocal } from '../../data';
import { capture as captureException } from '../../errorHandler';
import { getPlugin, Plugin as IPlugin, Settings, Local } from '../../plugins';
import Crashed from './Crashed';

interface OwnProps {
  pluginKey: string;
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
  plugin: getPlugin(ownProps.pluginKey),
  settings: (state.storage[ownProps.pluginKey] || {}).settings,
  local: (state.storage[ownProps.pluginKey] || {}).local,
});

// Launching updates off-thread to prevent issues pushing state at hydration
const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: OwnProps,
) => ({
  setLocal: (state: Local) => {
    setImmediate(() => dispatch(setLocal(ownProps.pluginKey, state)));
  },
  updateLocal: (state: Local) => {
    setImmediate(() => dispatch(updateLocal(ownProps.pluginKey, state)));
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
