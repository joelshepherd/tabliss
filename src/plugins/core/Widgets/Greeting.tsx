import * as React from 'react';

interface Props {
  name?: string;
}

interface State {
  greeting: string;
}

class Greeting extends React.Component<Props, State> {
  static defaultProps = {
    name: 'Human',
  };

  private interval: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      greeting: this.getGreeting(),
    };
  }

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
    } else if (hour < 5) {
      return 'Rise and shine';
    } else if (hour < 9) {
      return 'Good morning';
    } else if (hour < 14) {
      return 'Hello';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else if (hour < 21) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  }
}

export default Greeting;
