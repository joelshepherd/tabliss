import * as React from 'react';

interface Props {
  name?: string;
}

interface State {
  greeting: string;
}

class Greeting extends React.PureComponent<Props, State> {
  static defaultProps = {
    name: '',
  };

  state = {
    greeting: this.getGreeting(),
  };

  private interval: number;

  componentWillMount() {
    this.interval = window.setInterval(
      () => this.setState({ greeting: this.getGreeting() }),
      1000
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Greeting">
        <h1>{this.state.greeting} {this.props.name}</h1>
      </div>
    );
  }

  private getGreeting() {
    const hour = new Date().getHours();

    if (hour < 3) {
      return 'Sleep well';
    } else if (hour < 6) {
      return 'Rise and shine';
    } else if (hour < 10) {
      return 'Good morning';
    } else if (hour < 14) {
      return 'Hello';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else if (hour < 22) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  }
}

export default Greeting;
