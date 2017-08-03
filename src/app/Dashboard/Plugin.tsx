import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action, getSettings, getState, pushState, State } from '../../data';
import { getPlugin, Plugin as PluginInterface, Settings, State as PluginState } from '../../plugins';
import './Background.css';

interface OwnProps {
  pluginKey: string;
}

interface Props extends OwnProps {
  plugin: PluginInterface;
  settings: Settings;
  state: PluginState;
  pushState: (state: PluginState) => void;
}

class Plugin extends React.Component<Props> {
  render() {
    const Component = this.props.plugin.Dashboard;

    return (
      <Component
        {...this.props.settings}
        state={this.props.state}
        pushState={this.props.pushState}
      />
    );
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return {
    plugin: getPlugin(ownProps.pluginKey),
    settings: getSettings(state.plugins, ownProps.pluginKey),
    state: getState(state.plugins, ownProps.pluginKey),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: OwnProps) => {
  return {
    pushState: (state: PluginState) => {
      // Launching off-thread to prevent issues pushing state at original hydration
      setImmediate(() => dispatch(pushState(ownProps.pluginKey, state)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plugin);
