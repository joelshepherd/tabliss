import * as React from 'react';

interface State {
  time: Date;
}

class Time extends React.Component<{}, State> {
  static title = 'Time Widget';
  static type = 'widget';
  private interval: number;

  constructor() {
    super();

    this.state = {
      time: new Date(),
    };
  }

  componentWillMount() {
    this.interval = window.setInterval(
      () => this.setState({ time: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Time">
        <h1>{this.state.time.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

export default Time;
