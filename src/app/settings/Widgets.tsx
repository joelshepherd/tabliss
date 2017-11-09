import * as React from 'react';
import { connect } from 'react-redux';
import { Action, addWidget, removeWidget, RootState } from '../../data';
import { getPlugin, getPluginsByType, Plugin as IPlugin, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugins: IPlugin[];
  widgets: IPlugin[];
  addWidget: (key: string) => Action;
  removeWidget: (key: string) => Action;
}

class Widgets extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <h3>Widgets</h3>

        {this.props.plugins.length > 0 &&
          <label>
            <select value={''} onChange={event => this.add(event.target.value)} className="primary">
              <option value={''}>Add a new widget</option>
              {this.props.plugins.map(plugin =>
                <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
              )}
            </select>
          </label>
        }

        {this.props.widgets.length === 0
          ? <p>No widgets selected.</p>
          : this.props.widgets.map(plugin =>
            <Plugin
              key={plugin.key}
              plugin={plugin}
              onRemove={() => this.props.removeWidget(plugin.key)}
            />
          )
        }
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
