import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../data';
import { weatherIcons } from './weatherIcons';
import './Weather.sass';

interface Props {
  latitude: number;
  longitude: number;
  local: Conditions;
  mode: string;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  setLocal: (state: Conditions) => void;
}

interface Conditions {
  icon: string;
  temperature: number;
  timestamp: number;
  units: string;
}

class Weather extends React.PureComponent<Props> {
  static defaultProps = {
    latitude: 0,
    longitude: 0,
    mode: 'corner',
  };

  componentWillMount() {
    if (this.shouldRefresh()) {
      this.getForecast();
    }
  }

  componentWillReceiveProps(props: Props) {
    if (props.latitude !== this.props.latitude || props.longitude !== this.props.longitude) {
      this.getForecast(props);
    }
  }

  render() {
    if (! this.props.local) {
      return null;
    }

    return (
      <div className={`Weather ${this.props.mode}`}>
        <i
          dangerouslySetInnerHTML={{ __html: weatherIcons[this.props.local.icon] }}
          title={this.props.local.icon}
        />
        <span className="temperature">
          {this.props.local.temperature}˚
        </span>
      </div>
    );
  }

  private shouldRefresh() {
    return ! (
      this.props.local &&
      this.props.local.timestamp &&
      (this.props.local.timestamp + 900000) > Date.now() // Refreshed in last 15 minutes
    );
  }

  private async getForecast({ latitude, longitude }: Props = this.props) {
    this.props.pushPending();

    const req = new Request(`${process.env.API_ENDPOINT}/forecast?latitude=${latitude}&longitude=${longitude}`);
    const res = await (await fetch(req)).json();

    this.props.setLocal({
      icon: res.data.icon,
      temperature: Math.round(res.data.temperature),
      timestamp: Date.now(),
      units: res.data.units,
    });

    this.props.popPending();
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(null, mapDispatchToProps)(Weather);
