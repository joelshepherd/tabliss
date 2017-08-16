import * as React from 'react';
import { connect } from 'react-redux';
import * as screenfull from 'screenfull';
import { State as RootState, toggleFocus, toggleSettings } from '../../data';
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
          <i className="fa fa-cog" />
        </a>
        <a onClick={this.props.toggleFocus} title="Toggle your widgets">
          <i className={'fa ' + (this.props.focus ? 'fa-circle-o' : 'fa-circle')} />
        </a>
        {screenfull.enabled &&
          <a onClick={() => screenfull.toggle()} title="Toggle fullscreen">
            <i className={'fa ' + (this.state.fullscreen ? 'fa-compress' : 'fa-expand')} />
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
  return {
    focus: state.dashboard.focus,
  };
};

const mapDispatchToProps = {
  toggleFocus,
  toggleSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
