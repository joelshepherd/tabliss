import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { ActionCreator, connect } from 'react-redux';
import * as screenfull from 'screenfull';
import { Action, RootState, toggleFocus, toggleSettings } from '../../data';
import './Overlay.sass';

const maximiseIcon = require('feather-icons/dist/icons/maximize-2.svg');
const minimiseIcon = require('feather-icons/dist/icons/minimize-2.svg');
const settingsIcon = require('feather-icons/dist/icons/settings.svg');
const eyeIcon = require('feather-icons/dist/icons/eye.svg');
const eyeOffIcon = require('feather-icons/dist/icons/eye-off.svg');
const pendingIcon = require('feather-icons/dist/icons/zap.svg');

interface Props {
  focus: boolean;
  pending: boolean;
  toggleFocus: ActionCreator<Action>;
  toggleSettings: ActionCreator<Action>;
}

interface State {
  fullscreen: boolean;
}

const messages = defineMessages({
  settingsHint: {
    id: 'dashboard.settingsHint',
    defaultMessage: 'Customise Tabliss',
    description: 'Hover hint text for the settings icon'
  },
  focusHint: {
    id: 'dashboard.focusHint',
    defaultMessage: 'Toggle widgets',
    description: 'Hover hint text for the widgets toggle'
  },
  fullscreenHint: {
    id: 'dashboard.fullscreenHint',
    defaultMessage: 'Toggle fullscreen',
    description: 'Hover hint text for the fullscreen toggle'
  },
  loadingHint: {
    id: 'dashboard.loadingHint',
    defaultMessage: 'Loading new content',
    description: 'Hover hint text for the loading icon (the lightning bolt)'
  }
});

class Overlay extends React.PureComponent<Props & InjectedIntlProps, State> {
  state: State = { fullscreen: screenfull.isFullscreen };

  componentWillMount() {
    if (screenfull.enabled) {
      screenfull.on('change', this.onFullscreen);
    }
  }

  componentWillUnmount() {
    if (screenfull.enabled) {
      screenfull.off('change', this.onFullscreen);
    }
  }

  render() {
    return (
      <div className="Overlay">
        <a onClick={this.props.toggleSettings} title={this.props.intl.formatMessage(messages.settingsHint)}>
          <i dangerouslySetInnerHTML={{ __html: settingsIcon }} />
        </a>
        <a onClick={this.props.toggleFocus} title={this.props.intl.formatMessage(messages.focusHint)}>
          <i dangerouslySetInnerHTML={{ __html: this.props.focus ? eyeOffIcon : eyeIcon }} />
        </a>
        {screenfull.enabled &&
          <a onClick={() => screenfull.toggle()} title={this.props.intl.formatMessage(messages.fullscreenHint)}>
            <i dangerouslySetInnerHTML={{ __html: this.state.fullscreen ? minimiseIcon : maximiseIcon }} />
          </a>
        }
      {this.props.pending && <span title={this.props.intl.formatMessage(messages.loadingHint)}>
        <i dangerouslySetInnerHTML={{ __html: pendingIcon }} />
      </span>}
      </div>
    );
  }

  private onFullscreen = () => {
    this.setState({ fullscreen: screenfull.isFullscreen });
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    focus: state.ui.focus,
    pending: state.ui.pending > 0,
  };
};

const mapDispatchToProps = { toggleFocus, toggleSettings };

export default injectIntl<{}>(connect(mapStateToProps, mapDispatchToProps)(Overlay));
