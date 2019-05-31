import React from 'react';
import { FormattedDate } from 'react-intl';
import { getConvertedDate } from '../../../utils';
import Analogue from './Analogue';
import Digital from './Digital';
import './Time.sass';

interface Props {
  hour12: boolean;
  mode: string;
  showDate: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  timezone?: string;
}

interface State {
  time: Date;
}

class Time extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    mode: 'digital',
    hour12: false,
    showDate: false,
    showMinutes: true,
    showSeconds: false,
  };
  state: State = { time: getConvertedDate() };
  private interval: number;

  componentWillMount() {
    this.interval = window.setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { hour12, mode, showDate, showMinutes, showSeconds } = this.props;
    const { time } = this.state;

    return (
      <div className="Time">
        {mode === 'analogue' ? (
          <Analogue
            time={time}
            showMinutes={showMinutes}
            showSeconds={showSeconds}
          />
        ) : (
          <Digital
            time={time}
            hour12={hour12}
            showMinutes={showMinutes}
            showSeconds={showSeconds}
          />
        )}

        {showDate && [
          <hr key="0" />,
          <h3 key="1">
            <FormattedDate
              value={time}
              day="numeric"
              month="long"
              weekday="long"
            />
          </h3>,
        ]}
      </div>
    );
  }

  private tick = () => {
    this.setState({ time: getConvertedDate() });
  };
}

export default Time;
