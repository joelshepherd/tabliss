import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { ActionCreator } from 'redux';
import { connect } from 'react-redux';
import * as screenfull from 'screenfull';
import { Action, RootState, toggleFocus, toggleSettings } from '../../data';
import { isInputEvent } from '../../utils';
import { eyeIcon, eyeOffIcon } from '../ui';
import './Overlay.sass';

const maximiseIcon = require('feather-icons/dist/icons/maximize-2.svg');
const minimiseIcon = require('feather-icons/dist/icons/minimize-2.svg');
const settingsIcon = require('feather-icons/dist/icons/settings.svg');
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
  state: State = { fullscreen: screenfull && screenfull.isFullscreen };

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);

    if (screenfull && screenfull.enabled) {
      screenfull.on('change', this.onFullscreen);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);

    if (screenfull && screenfull.enabled) {
      screenfull.off('change', this.onFullscreen);
    }
  }

  render() {
    const { focus, intl, pending } = this.props;

    const settingsHint = intl.formatMessage(messages.settingsHint);
    const focusHint = intl.formatMessage(messages.focusHint);
    const fullscreenHint = intl.formatMessage(messages.fullscreenHint);

    return (
      <div className="Overlay">
        <a onClick={this.props.toggleSettings} title={`${settingsHint} (S)`}>
          <i dangerouslySetInnerHTML={{ __html: settingsIcon }} />
        </a>

        <a onClick={this.props.toggleFocus} title={`${focusHint} (W)`}>
          {focus ? eyeOffIcon : eyeIcon}
        </a>

        {screenfull && screenfull.enabled && (
          <a onClick={() => screenfull && screenfull.toggle()} title={`${fullscreenHint} (F)`}>
            <i dangerouslySetInnerHTML={{ __html: this.state.fullscreen ? minimiseIcon : maximiseIcon }} />
          </a>
        )}

        {pending && (
          <span title={intl.formatMessage(messages.loadingHint)}>
            <i dangerouslySetInnerHTML={{ __html: pendingIcon }} />
          </span>
        )}
      </div>
    );
  }

  private onFullscreen = () => {
    this.setState({ fullscreen: screenfull && screenfull.isFullscreen });
  }

  private onKeyDown = (event: KeyboardEvent) => {
    // Check for input focus
    if (isInputEvent(event)) {
      return;
    }

    switch (event.keyCode) {
      case 70: // F
        screenfull && screenfull.toggle();
        break;

      case 83: // S
        this.props.toggleSettings();
        break;

      case 87: // W
        this.props.toggleFocus();
        break;

      default:
    }
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
