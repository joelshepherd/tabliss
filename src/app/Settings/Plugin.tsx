import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action, RootState, updateSettings } from '../../data';
import { Plugin as IPlugin, Settings } from '../../plugins';
import './Plugin.sass';
const closeIcon = require('feather-icons/dist/icons/x.svg');
const expandIcon = require('feather-icons/dist/icons/chevron-down.svg');
const collapseIcon = require('feather-icons/dist/icons/chevron-up.svg');

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
    open: typeof this.props.onRemove === 'undefined',
  };

  render() {
    const Component = this.props.plugin.Settings;

    return (
      <fieldset className="Plugin">
        {typeof this.props.onRemove !== 'undefined' &&
          <div>
            <button
              className="button--icon"
              onClick={this.props.onRemove}
              style={{ float: 'right' }}
              title="Remove this widget"
            >
              <i dangerouslySetInnerHTML={{ __html: closeIcon }} />
            </button>

            <button
              className="button--icon"
              onClick={this.toggle}
              style={{ float: 'right', marginRight: '0.5rem' }}
              title="Remove this widget"
            >
              <i dangerouslySetInnerHTML={{ __html: this.state.open ? collapseIcon : expandIcon }} />
            </button>
          </div>
        }

        <h4>{this.props.plugin.title}</h4>

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
