import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { changeSettings, State, toggleWidget } from '../../data';
import { getPluginsByType, Plugin, Settings, Type } from '../../plugins';
import Widget from './Widget';

interface Props {
  plugins: Plugin[];
  settings: Settings[];
  widgets: string[];
  toggleWidget: (key: string) => void;
  changeSettings: (key: string, settings: Settings) => void;
}

class Widgets extends Component<Props> {
  render() {
    return (
      <div>
        <h3>Widgets</h3>

        {this.props.plugins.map(plugin =>
          <Widget
            key={plugin.key}
            plugin={plugin}
            toggleWidget={() => this.props.toggleWidget(plugin.key)}
            changeSettings={(settings: Settings) => this.props.changeSettings(plugin.key, settings)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    plugins: getPluginsByType(Type.WIDGET),
  };
};

const mapDispatchToProps = {
  changeSettings,
  toggleWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);
