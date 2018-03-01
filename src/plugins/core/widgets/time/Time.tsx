import { DateTime } from 'luxon';
import * as React from 'react';
import Analogue from './Analogue';
import Digital from './Digital';
import './Time.sass';

interface Props {
  hour12: boolean;
  mode: string;
  showDate: boolean;
  timezone?: string;
}

interface State {
  time: DateTime;
}

class Time extends React.PureComponent<Props, State> {
  static defaultProps = {
    mode: 'digital',
    hour12: false,
    showDate: false,
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
    const { hour12, mode, showDate } = this.props;
    const { time } = this.state;

    return (
      <div className="Time">
        {mode === 'analogue'
          ? <Analogue time={time} />
          : <Digital time={time} hour12={hour12} />
        }

        {showDate && [
          <hr key="0" />,
          <h4 key="1" >{time.toLocaleString({ day: 'numeric', month: 'long', weekday: 'long' })}</h4>,
        ]}
      </div>
    );
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
