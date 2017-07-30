import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as screenfull from 'screenfull';
import { State as RootState, toggleFocus } from '../../data';
import './Overlay.css';

interface Props {
  focus: boolean;
  toggleFocus: () => void;
}

interface State {
  fullscreen: boolean;
}

class Overlay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fullscreen: screenfull.isFullscreen,
    };

    screenfull.onchange(() => this.setState({
      fullscreen: screenfull.isFullscreen,
    }));
  }

  render() {
    return (
      <div className="Overlay">
        <div title="Sorry if things break!" style={{float: 'right'}}>beta</div>

        <Link to="/settings" title="Personalise your dashboard">
          <i className="fa fa-cog" />
        </Link>
        &nbsp;&nbsp;
        <a href="javascript:;" onClick={this.props.toggleFocus} title="Toggle your widgets">
          <i className={'fa ' + (this.props.focus ? 'fa-circle-o' : 'fa-circle')} />
        </a>
        &nbsp;&nbsp;
        {screenfull.enabled &&
          <a href="javascript:;" onClick={() => screenfull.toggle()} title="Toggle fullscreen">
            <i className={'fa ' + (this.state.fullscreen ? 'fa-compress' : 'fa-expand')} />
          </a>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    focus: state.dashboard.focus,
  };
};

const mapDispatchToProps = {
  toggleFocus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
