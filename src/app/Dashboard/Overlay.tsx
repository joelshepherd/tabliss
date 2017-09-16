import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import * as screenfull from 'screenfull';
import { Action, RootState, toggleFocus, toggleSettings } from '../../data';
import './Overlay.css';

const maximiseIcon = require('feather-icons/dist/icons/maximize-2.svg');
const minimiseIcon = require('feather-icons/dist/icons/minimize-2.svg');
const settingsIcon = require('feather-icons/dist/icons/settings.svg');
const eyeIcon = require('feather-icons/dist/icons/eye.svg');
const eyeOffIcon = require('feather-icons/dist/icons/eye-off.svg');
const pendingIcon = require('feather-icons/dist/icons/download-cloud.svg');

interface Props {
  focus: boolean;
  pending: boolean;
  toggleFocus: ActionCreator<Action>;
  toggleSettings: ActionCreator<Action>;
}

interface State {
  fullscreen: boolean;
}

class Overlay extends React.PureComponent<Props, State> {
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
        <a onClick={this.props.toggleSettings} title="Personalise your dashboard">
          <i dangerouslySetInnerHTML={{ __html: settingsIcon }} />
        </a>
        <a onClick={this.props.toggleFocus} title="Toggle your widgets">
          <i dangerouslySetInnerHTML={{ __html: this.props.focus ? eyeOffIcon : eyeIcon }} />
        </a>
        {screenfull.enabled &&
          <a onClick={() => screenfull.toggle()} title="Toggle fullscreen">
            <i dangerouslySetInnerHTML={{ __html: this.state.fullscreen ? minimiseIcon : maximiseIcon }} />
          </a>
        }
      {this.props.pending && <span><i dangerouslySetInnerHTML={{ __html: pendingIcon }} /></span>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
