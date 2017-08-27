import * as React from 'react';
import { connect } from 'react-redux';
import { addWidget, removeWidget, RootState } from '../../data';
import { getPlugin, getPluginsByType, Plugin as IPlugin, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugins: IPlugin[];
  widgets: IPlugin[];
  addWidget: (key: string) => void;
  removeWidget: (key: string) => void;
}

class Widgets extends React.Component<Props> {
  render() {
    return (
      <div>
        <h3>Widgets</h3>

        <div className="box">
          <label>
            Add a new widget
            <select onChange={event => this.add(event.target.value)}>
              <option value={''} selected={true}>Select to add</option>
              {this.props.plugins.map(plugin =>
                <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
              )}
            </select>
          </label>
        </div>

        {this.props.widgets.map(plugin =>
          <Plugin
            key={plugin.key}
            plugin={plugin}
            onRemove={() => this.props.removeWidget(plugin.key)}
          />
        )}
      </div>
    );
  }

  private add(key: string) {
    if (key !== '') {
      this.props.addWidget(key);
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    plugins: getPluginsByType(Type.WIDGET).filter(plugin => ! state.dashboard.widgets.includes(plugin.key)),
    widgets: state.dashboard.widgets.map(getPlugin),
  };
};

const mapDispatchToProps = { addWidget, removeWidget };

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);
