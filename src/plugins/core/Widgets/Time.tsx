import * as React from 'react';

interface Props {
  hour12?: boolean;
}

interface State {
  time: Date;
}

class Time extends React.Component<Props, State> {
  static defaultProps: Props = {};

  private interval: number;

  constructor(props: Props) {
    super(props);

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

    // Default format
    try {
      return this.state.time.toLocaleTimeString(undefined, {
        hour12: this.props.hour12,
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
        <h1 style={{fontSize: '4em'}}>{this.formattedTime()}</h1>
      </div>
    );
  }
}

export default Time;
