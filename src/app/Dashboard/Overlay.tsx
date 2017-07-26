import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { State, toggleFocus } from '../../data';
import './Overlay.css';

interface Props {
  focus: boolean;
  toggleFocus: () => void;
}

class Overlay extends React.Component<Props> {
  render() {
    return (
      <div className="Overlay">
        <Link to="/settings">Settings</Link>
        &nbsp;
        <a href="javascript:;" onClick={this.props.toggleFocus}>
          {this.props.focus ? 'Standard' : 'Focus'}
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    focus: state.dashboard.focus,
  };
}

const mapDispatchToProps = {
  toggleFocus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
