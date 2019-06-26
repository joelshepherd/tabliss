import React from 'react';
import { connect } from 'react-redux';
import { Action, RootState, updateSettings } from '../../data';
import { Plugin as IPlugin, Settings } from '../../plugins';
import {
  arrowDownIcon,
  arrowUpIcon,
  collapseIcon,
  expandIcon,
  IconButton,
  removeIcon,
} from '../../components';
import './Plugin.sass';

interface OwnProps {
  plugin: IPlugin;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove?: () => void;
}

interface Props extends OwnProps {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

interface State {
  open: boolean;
}

class Plugin extends React.PureComponent<Props, State> {
  state: State = {
    open: this.props.onRemove === undefined,
  };

  render() {
    const Component = this.props.plugin.Settings;

    return (
      <fieldset className="Plugin">
        {this.props.onRemove !== undefined ? (
          <div className="title--buttons">
            <IconButton
              onClick={this.toggle}
              title={`${this.state.open ? 'Close' : 'Edit'} widget settings`}
            >
              {this.state.open ? collapseIcon : expandIcon}
            </IconButton>

            {this.state.open && this.props.onRemove !== undefined && (
              <IconButton
                key="remove"
                onClick={this.props.onRemove}
                title="Remove widget"
              >
                {removeIcon}
              </IconButton>
            )}

            {this.state.open && this.props.onMoveDown !== undefined && (
              <IconButton
                key="down"
                onClick={this.props.onMoveDown}
                title="Move widget down"
              >
                {arrowDownIcon}
              </IconButton>
            )}

            {this.state.open && this.props.onMoveUp !== undefined && (
              <IconButton
                key="up"
                onClick={this.props.onMoveUp}
                title="Move widget up"
              >
                {arrowUpIcon}
              </IconButton>
            )}

            <h4 onClick={this.toggle}>{this.props.plugin.title}</h4>
          </div>
        ) : (
          <h4>{this.props.plugin.title}</h4>
        )}

        {this.state.open && Component && (
          <Component
            {...this.props.settings}
            onChange={this.props.updateSettings}
          />
        )}
      </fieldset>
    );
  }

  private toggle = () => this.setState({ open: !this.state.open });
}

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  settings: (state.storage[props.plugin.key] || {}).settings,
});

const mapDispatchToProps = (dispatch: any, props: OwnProps) => ({
  updateSettings: (settings: Settings) => {
    dispatch(updateSettings(props.plugin.key, settings));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Plugin);
