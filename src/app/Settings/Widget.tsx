import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getSettings, State } from '../../data';
import { Plugin, Settings } from '../../plugins';

interface Props {
  plugin: Plugin;
  settings: Settings;
  widgets: string[];
  toggleWidget: () => void;
  changeSettings: (settings: Settings) => void;
}

class Widget extends Component<Props> {
  render() {
    return (
      <div>
        <h4>{this.props.plugin.title}</h4>
        <label>
          Show
          <input
            type="checkbox"
            checked={this.props.widgets.includes(this.props.plugin.key)}
            onChange={this.props.toggleWidget}
          />
        </label>

        {this.props.plugin.Settings && <this.props.plugin.Settings
          {...this.props.settings}
          onChange={this.props.changeSettings}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state: State, props: any) => {
  return {
    settings: getSettings(state.plugins, props.plugin.key),
    widgets: state.dashboard.widgets,
  };
};

export default connect(mapStateToProps, {})(Widget);
