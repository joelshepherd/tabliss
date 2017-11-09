import * as React from 'react';
import { connect } from 'react-redux';
import { Action, changeBackground, RootState } from '../../data';
import { getPlugin, getPluginsByType, Plugin as IPlugin, Type } from '../../plugins';
import Plugin from './Plugin';

interface Props {
  plugin: IPlugin;
  plugins: IPlugin[];
  changeBackground: (event: React.ChangeEvent<HTMLSelectElement>) => Action;
}

const Background: React.StatelessComponent<Props> = (props) => {
  return (
    <div>
      <h3>Background</h3>

      <label>
        <select value={props.plugin.key} onChange={props.changeBackground} className="primary">
          {props.plugins.map(plugin =>
            <option key={plugin.key} value={plugin.key}>{plugin.title}</option>
          )}
        </select>
      </label>

      {props.plugin.Settings && <Plugin key={props.plugin.key} plugin={props.plugin} />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    plugin: getPlugin(state.dashboard.background),
    plugins: getPluginsByType(Type.BACKGROUND),
  };
};

const mapDispatchToProps = {
  changeBackground: (event: React.ChangeEvent<HTMLSelectElement>) => changeBackground(event.target.value),
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
