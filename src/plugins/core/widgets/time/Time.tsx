import { DateTime } from 'luxon';
import * as React from 'react';
import Analogue from './Analogue';
import Digital from './Digital';

interface Props {
  hour12: boolean;
  mode: string;
  timezone?: string;
}

interface State {
  time: DateTime;
}

class Time extends React.PureComponent<Props, State> {
  static defaultProps = {
    mode: 'digital',
    hour12: false,
  };
  state: State = { time: this.getDateTime() };
  private interval: number;

  componentWillMount() {
    this.interval = window.setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  componentWillReceiveProps(props: Props) {
    this.tick(props);
  }

  render() {
    if (this.props.mode === 'analogue') {
      return <Analogue time={this.state.time} />;
    }

    return <Digital time={this.state.time} hour12={this.props.hour12} />;
  }

  private tick = (props: Props = this.props) => {
    this.setState({ time: this.getDateTime(props) });
  }

  private getDateTime({ timezone }: Props = this.props) {
    return timezone
      ? DateTime.local().setZone(timezone)
      : DateTime.local();
  }
}

export default Time;
