import * as React from 'react';
import { Component, ChangeEvent, ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { changeBackground, changeSettings, getSettings, State } from '../../data';
import { getPlugin, getPluginsByType, Plugin, Type, Settings } from '../../plugins';

interface Props {
  available: Plugin[];
  background: string;
  plugin: Plugin;
  settings: Settings;
  changeBackground: ChangeEventHandler<HTMLSelectElement>;
  changeSettings: (key: string, settings: Settings) => void;
}

class Background extends Component<Props> {
  render() {
    const SettingsComponent = this.props.plugin.Settings;
    return (
      <div>
        <h3>Background</h3>

        <label>
          <select value={this.props.background} onChange={this.props.changeBackground}>
            {this.props.available.map(plugin =>
              <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
            )}
          </select>
        </label>

        {SettingsComponent &&
          <SettingsComponent
            {...this.props.settings}
            onChange={(settings: Settings) => this.props.changeSettings(this.props.plugin.key, settings)}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    available: getPluginsByType(Type.BACKGROUND),
    background: state.dashboard.background,
    plugin: getPlugin(state.dashboard.background),
    settings: getSettings(state.plugins, state.dashboard.background),
  };
};

const mapDispatchToProps = {
  changeBackground: (event: ChangeEvent<HTMLSelectElement>) => changeBackground(event.target.value),
  changeSettings: (key: string, settings: Settings) => changeSettings(key, settings),
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
