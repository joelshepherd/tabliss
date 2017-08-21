import * as React from 'react';
import { Component, ChangeEvent, ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { changeBackground, RootState } from '../../data';
import { getPlugin, getPluginsByType, Plugin as IPlugin, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugin: IPlugin;
  plugins: IPlugin[];
  changeBackground: ChangeEventHandler<HTMLSelectElement>;
}

class Background extends Component<Props> {
  render() {
    return (
      <div>
        <h3>Background</h3>

        <label>
          Select a provider
          <select value={this.props.plugin.key} onChange={this.props.changeBackground}>
            {this.props.plugins.map(plugin =>
              <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
            )}
          </select>
        </label>

        {this.props.plugin.Settings &&
          <Plugin key={this.props.plugin.key} plugin={this.props.plugin} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    plugin: getPlugin(state.dashboard.background),
    plugins: getPluginsByType(Type.BACKGROUND),
  };
};

const mapDispatchToProps = {
  changeBackground: (event: ChangeEvent<HTMLSelectElement>) => changeBackground(event.target.value),
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
