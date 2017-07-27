import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getSettings, getState, State } from '../../data';
import { getPlugin, Plugin, Settings } from '../../plugins';
import './Background.css';

interface Props {
  plugin: Plugin;
  settings: Settings;
  state: any; // tslint:disable-line no-any
}

class Background extends Component<Props> {
  render() {
    const DashboardComponent = this.props.plugin.Dashboard;

    return (
      <DashboardComponent
        {...this.props.settings}
        state={this.props.state}
      />
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    plugin: getPlugin(state.dashboard.background),
    settings: getSettings(state.plugins, state.dashboard.background),
    state: getState(state.plugins, state.dashboard.background),
  };
};

export default connect(mapStateToProps, {})(Background);
