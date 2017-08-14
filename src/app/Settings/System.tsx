import * as React from 'react';
import { connect } from 'react-redux';
import { changeSettings, State, toggleSystem } from '../../data';
import { getPluginsByType, Plugin as IPlugin, Settings, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugins: IPlugin[];
  system: string[];
  toggleSystem: (key: string) => void;
  changeSettings: (key: string, settings: Settings) => void;
}

class System extends React.Component<Props> {
  render() {
    return (
      <div>
        <h3>System</h3>

        {this.props.plugins.map(plugin =>
          <Plugin
            key={plugin.key}
            plugin={plugin}
            enabled={this.props.system.includes(plugin.key)}
            onChange={(settings: Settings) => this.props.changeSettings(plugin.key, settings)}
            onToggle={() => this.props.toggleSystem(plugin.key)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    plugins: getPluginsByType(Type.SYSTEM),
    system: state.dashboard.system,
  };
};

const mapDispatchToProps = {
  changeSettings,
  toggleSystem,
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
