import * as React from 'react';
import { connect } from 'react-redux';
import { getSettings, State } from '../../data';
import { Plugin as IPlugin, Settings } from '../../plugins';

interface Props {
  enabled: boolean;
  plugin: IPlugin;
  settings: Settings;
  onToggle: () => void;
  onChange: (settings: Settings) => void;
}

class Plugin extends React.PureComponent<Props> {
  render() {
    const SettingsComponent = this.props.plugin.Settings;

    return (
      <fieldset>
        <legend>{this.props.plugin.title}</legend>

        <label>
          <input
            type="checkbox"
            checked={this.props.enabled}
            onChange={this.props.onToggle}
          />
          &nbsp;
          Enable
        </label>

        {SettingsComponent &&
          <SettingsComponent
            {...this.props.settings}
            onChange={this.props.onChange}
          />
        }
      </fieldset>
    );
  }
}

interface OwnProps {
  enabled: boolean;
  plugin: IPlugin;
  onChange: (settings: Settings) => void;
  onToggle: () => void;
}

const mapStateToProps = (state: State, props: OwnProps) => {
  return {
    settings: getSettings(state.plugins, props.plugin.key),
  };
};

export default connect(mapStateToProps, {})(Plugin);
