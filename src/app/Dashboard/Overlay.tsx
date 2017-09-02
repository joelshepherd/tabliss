import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import * as screenfull from 'screenfull';
import { Action, RootState, toggleFocus, toggleSettings } from '../../data';
import './Overlay.css';

const circleIcon = require('feather-icons/dist/icons/circle.svg');
const maximiseIcon = require('feather-icons/dist/icons/maximize.svg');
const minimiseIcon = require('feather-icons/dist/icons/minimize.svg');
const plusCircleIcon = require('feather-icons/dist/icons/plus-circle.svg');
const settingsIcon = require('feather-icons/dist/icons/settings.svg');

interface Props {
  focus: boolean;
  toggleFocus: ActionCreator<Action>;
  toggleSettings: ActionCreator<Action>;
}

interface State {
  fullscreen: boolean;
}

class Overlay extends React.PureComponent<Props, State> {
  state: State = {
    fullscreen: screenfull.isFullscreen,
  };

  componentWillMount() {
    screenfull.on('change', this.onFullscreen);
  }

  componentWillUnmount() {
    screenfull.off('change', this.onFullscreen);
  }

  render() {
    return (
      <div className="Overlay">
        <a onClick={this.props.toggleSettings} title="Personalise your dashboard">
          <i dangerouslySetInnerHTML={{ __html: settingsIcon }} />
        </a>
        <a onClick={this.props.toggleFocus} title="Toggle your widgets">
          <i dangerouslySetInnerHTML={{ __html: this.props.focus ? circleIcon : plusCircleIcon }} />
        </a>
        {screenfull.enabled &&
          <a onClick={() => screenfull.toggle()} title="Toggle fullscreen">
            <i dangerouslySetInnerHTML={{ __html: this.state.fullscreen ? minimiseIcon : maximiseIcon }} />
          </a>
        }
      </div>
    );
  }

  private onFullscreen = () => {
    this.setState({ fullscreen: screenfull.isFullscreen });
  }
}

const mapStateToProps = (state: RootState) => {
  return { focus: state.ui.focus };
};

const mapDispatchToProps = { toggleFocus, toggleSettings };

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
