import * as React from 'react';

interface Props {
  hour12?: boolean;
}

interface State {
  time: Date;
}

class Time extends React.PureComponent<Props, State> {
  state = {
    time: new Date(),
  };

  private interval: number;

  componentWillMount() {
    this.interval = window.setInterval(() => this.setState({ time: new Date() }), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Time">
        <h1 style={{fontSize: '4em'}}>{this.formattedTime()}</h1>
      </div>
    );
  }

  private formattedTime() {
    // Try full browser support
    try {
      return this.state.time.toLocaleTimeString(undefined, {
        hour12: this.props.hour12,
        hour: 'numeric',
        minute: 'numeric',
      });
    } catch (e) {
      //
    }

    // Try partial browser support
    try {
      return this.state.time.toLocaleTimeString(undefined, {
        hour12: this.props.hour12,
      });
    } catch (e) {
      //
    }

    // Otherwise basic support
    return this.state.time.toLocaleTimeString();
  }
}

export default Time;
