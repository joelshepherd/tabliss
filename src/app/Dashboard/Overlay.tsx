import * as React from 'react';
import { Circle, Maximize, Minimize, PlusCircle, Settings } from 'react-feather';
import { connect } from 'react-redux';
import * as screenfull from 'screenfull';
import { RootState, toggleFocus, toggleSettings } from '../../data';
import './Overlay.css';

interface Props {
  focus: boolean;
  toggleFocus: () => void;
  toggleSettings: () => void;
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
          <Settings />
        </a>
        <a onClick={this.props.toggleFocus} title="Toggle your widgets">
          {this.props.focus ? <PlusCircle /> : <Circle />}
        </a>
        {screenfull.enabled &&
          <a onClick={() => screenfull.toggle()} title="Toggle fullscreen">
            {this.state.fullscreen ? <Minimize /> : <Maximize />}
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
