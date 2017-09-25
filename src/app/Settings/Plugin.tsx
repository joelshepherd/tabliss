import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action, RootState, updateSettings } from '../../data';
import { Plugin as IPlugin, Settings } from '../../plugins';
import './Plugin.sass';
const removeIcon = require('feather-icons/dist/icons/trash.svg');
const expandIcon = require('feather-icons/dist/icons/settings.svg');
const collapseIcon = require('feather-icons/dist/icons/chevrons-up.svg');

interface OwnProps {
  plugin: IPlugin;
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
    const togglable = this.props.onRemove !== undefined;
    const Component = this.props.plugin.Settings;

    return (
      <fieldset className="Plugin">
        {togglable
          ? <div className="title--buttons">
              <button className="button--icon" onClick={this.toggle} title="Edit widget settings">
                <i dangerouslySetInnerHTML={{ __html: this.state.open ? collapseIcon : expandIcon }} />
              </button>

              {this.state.open &&
                <button className="button--icon" onClick={this.props.onRemove} title="Remove widget">
                  <i dangerouslySetInnerHTML={{ __html: removeIcon }} />
                </button>
              }

              <h4 onClick={this.toggle}>{this.props.plugin.title}</h4>
            </div>
          : <h4>{this.props.plugin.title}</h4>
        }

        {this.state.open && Component && <Component {...this.props.settings} onChange={this.props.updateSettings} />}
      </fieldset>
    );
  }

  private toggle = () => this.setState({ open: ! this.state.open });
}

const mapStateToProps = (state: RootState, props: OwnProps) => {
  return {
    settings: (state.storage[props.plugin.key] || {}).settings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => {
  return {
    updateSettings: (settings: Settings) => {
      dispatch(updateSettings(props.plugin.key, settings));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plugin);
