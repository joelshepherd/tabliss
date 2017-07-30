import * as React from 'react';

interface State {
  time: Date;
}

class Time extends React.Component<{}, State> {
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

  formattedTime() {
    try {
      return this.state.time.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return this.state.time.toLocaleTimeString();
    }
  }

  render() {
    return (
      <div className="Time">
        <h1 style={{fontSize: '4rem'}}>{this.formattedTime()}</h1>
      </div>
    );
  }
}

export default Time;
