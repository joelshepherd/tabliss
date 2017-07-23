import * as React from 'react';
import { Plugin } from '../../plugins';
import { connect } from 'react-redux';
import { changeBackground, updateBackgroundSettings } from '../../data/actions';

interface Props {
  plugins: Plugin[],
  background: any;
  onChangeBackground: (index: number) => void;
  onChangeSettings: () => void;
}

class Background extends React.Component<Props> {
  render() {
    const backgroundOptions = this.props.plugins
      .filter(plugin => plugin.type === 'background')
      .map((background, key) =>
        <option key={key} value={key}>{background.title}</option>
      );

    return (
      <div>
        <h3>Background</h3>

        <label>
          <select
            value={this.props.plugins.indexOf(this.props.background.component)}
            onChange={event => this.props.onChangeBackground(this.props.plugins[event.target.value])}
          >
            {backgroundOptions}
          </select>
        </label>

        <h4>Settings</h4>
        <this.props.background.component.settings
          onChange={this.props.onChangeSettings}
          {...this.props.background.settings}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    plugins: state.plugins,
    background: state.background,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onChangeBackground: (background: Plugin) => dispatch(changeBackground(background)),
    onChangeSettings: (settings: any) => dispatch(updateBackgroundSettings(settings))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
