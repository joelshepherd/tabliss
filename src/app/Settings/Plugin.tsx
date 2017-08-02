import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getSettings, State } from '../../data';
import { Plugin as PluginInterface, Settings } from '../../plugins';

interface Props {
  enabled: boolean;
  plugin: PluginInterface;
  settings: Settings;
  toggle: () => void;
  changeSettings: (settings: Settings) => void;
}

class Plugin extends Component<Props> {
  render() {
    const SettingsComponent = this.props.plugin.Settings;

    return (
      <div>
        <h4>{this.props.plugin.title}</h4>

        <label>
          <input
            type="checkbox"
            checked={this.props.enabled}
            onChange={this.props.toggle}
          />
          &nbsp;
          Enable
        </label>

        {SettingsComponent &&
          <SettingsComponent
            {...this.props.settings}
            onChange={this.props.changeSettings}
          />
        }
      </div>
    );
  }
}

interface OwnProps {
  changeSettings: (settings: Settings) => void;
  enabled: boolean;
  plugin: PluginInterface;
  toggle: () => void;
}

const mapStateToProps = (state: State, props: OwnProps) => {
  return {
    settings: getSettings(state.plugins, props.plugin.key),
  };
};

export default connect(mapStateToProps, {})(Plugin);
