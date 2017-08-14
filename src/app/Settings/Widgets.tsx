import * as React from 'react';
import { connect } from 'react-redux';
import { changeSettings, State, toggleWidget } from '../../data';
import { getPluginsByType, Plugin as IPlugin, Settings, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugins: IPlugin[];
  widgets: string[];
  toggleWidget: (key: string) => void;
  changeSettings: (key: string, settings: Settings) => void;
}

class Widgets extends React.Component<Props> {
  render() {
    return (
      <div>
        <h3>Widgets</h3>

        {this.props.plugins.map(plugin =>
          <Plugin
            key={plugin.key}
            plugin={plugin}
            enabled={this.props.widgets.includes(plugin.key)}
            onChange={(settings: Settings) => this.props.changeSettings(plugin.key, settings)}
            onToggle={() => this.props.toggleWidget(plugin.key)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    plugins: getPluginsByType(Type.WIDGET),
    widgets: state.dashboard.widgets,
  };
};

const mapDispatchToProps = {
  changeSettings,
  toggleWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);
