import * as React from 'react';
import { Component, ChangeEvent, ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { changeBackground, changeSettings, State } from '../../data';
import { getPlugin, getPluginsByType, Plugin as IPlugin, Type, Settings } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  background: string;
  plugin: IPlugin;
  plugins: IPlugin[];
  changeBackground: ChangeEventHandler<HTMLSelectElement>;
  changeSettings: (key: string, settings: Settings) => void;
}

class Background extends Component<Props> {
  render() {
    return (
      <div>
        <h3>Background</h3>

        <label>
          Select a provider
          <select value={this.props.background} onChange={this.props.changeBackground}>
            {this.props.plugins.map(plugin =>
              <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
            )}
          </select>
        </label>

        {this.props.plugin.Settings &&
          <Plugin
            key={this.props.plugin.key}
            plugin={this.props.plugin}
            onChange={(settings: Settings) => this.props.changeSettings(this.props.plugin.key, settings)}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    background: state.dashboard.background,
    plugin: getPlugin(state.dashboard.background),
    plugins: getPluginsByType(Type.BACKGROUND),
  };
};

const mapDispatchToProps = {
  changeBackground: (event: ChangeEvent<HTMLSelectElement>) => changeBackground(event.target.value),
  changeSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
