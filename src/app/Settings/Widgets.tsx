import * as React from 'react';
import { connect } from 'react-redux';
import { changeSettings, State, toggleWidget } from '../../data';
import { getPlugin, getPluginsByType, Plugin as IPlugin, Settings, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugins: IPlugin[];
  widgets: IPlugin[];
  toggleWidget: (key: string) => void;
  changeSettings: (key: string, settings: Settings) => void;
}

class Widgets extends React.Component<Props> {
  private selected: HTMLSelectElement | null;

  render() {
    return (
      <div>
        <h3>Widgets</h3>

        <label>
          Add a widget
          <select ref={ref => this.selected = ref}>
            {this.props.plugins.map(plugin =>
              <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
            )}
          </select>
        </label>
        <button onClick={() => this.add()}>Add</button>

        {this.props.widgets.map(plugin =>
          <Plugin
            key={plugin.key}
            plugin={plugin}
            onChange={(settings: Settings) => this.props.changeSettings(plugin.key, settings)}
            onToggle={() => this.props.toggleWidget(plugin.key)}
          />
        )}
      </div>
    );
  }

  private add() {
    if (this.selected && this.selected.value) {
      this.props.toggleWidget(this.selected.value);
    }
  }
}

const mapStateToProps = (state: State) => {
  return {
    plugins: getPluginsByType(Type.WIDGET).filter(plugin => ! state.dashboard.widgets.includes(plugin.key)),
    widgets: state.dashboard.widgets.map(getPlugin),
  };
};

const mapDispatchToProps = {
  changeSettings,
  toggleWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);
