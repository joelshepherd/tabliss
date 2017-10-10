import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../data';
import { weatherIcons } from './weatherIcons';
import './Weather.sass';

interface Props {
  latitude: number;
  longitude: number;
  local: Local;
  mode: string;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  updateLocal: (state: Partial<Local>) => void;
}

interface Local {
  conditions: Conditions;
  details: boolean;
}

interface Conditions {
  alerts: {
    title: string;
    description: string;
  }[];
  apparentTemperature: number;
  humidity: number;
  icon: string;
  precipProbability: number;
  temperature: number;
  precipType?: number;
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
    if (! this.props.local || ! this.props.local.conditions) {
      return <div className={`Weather ${this.props.mode}`}>-</div>;
    }

    return (
      <div className={`Weather ${this.props.mode}`}>
        <div className="summary" onClick={this.toggleExpand} title="Toggle weather details">
          <i dangerouslySetInnerHTML={{ __html: weatherIcons[this.props.local.conditions.icon] }} />
          <span className="temperature">
            {this.props.local.conditions.temperature}˚
          </span>
        </div>

        {this.props.mode === 'corner' && this.props.local.details &&
          <div className="details">
            <dl>
              <dt>{this.props.local.conditions.humidity * 100}%</dt>
              <dd>Humidity</dd>
            </dl>
            <dl>
              <dt>{this.props.local.conditions.precipProbability * 100}%</dt>
              <dd>Chance of {this.props.local.conditions.precipType || 'rain'}</dd>
            </dl>
            <dl>
              <dt>{this.props.local.conditions.apparentTemperature}˚</dt>
              <dd>Feels like</dd>
            </dl>
        </div>
        }
      </div>
    );
  }

  private toggleExpand = () => {
    if (this.props.mode === 'corner') {
      this.props.updateLocal({ details: ! this.props.local.details });
    }
  }

  private shouldRefresh() {
    return ! (
      this.props.local &&
      this.props.local.conditions &&
      this.props.local.conditions.timestamp &&
      (this.props.local.conditions.timestamp + 900000) > Date.now() // Refreshed in last 15 minutes
    );
  }

  private async getForecast({ latitude, longitude }: Props = this.props) {
    this.props.pushPending();

    const req = new Request(`${process.env.API_ENDPOINT}/forecast?latitude=${latitude}&longitude=${longitude}`);
    const res = await (await fetch(req)).json();

    this.props.updateLocal({
      conditions: {
        ...res.data,
        apparentTemperature: Math.round(res.data.apparentTemperature),
        temperature: Math.round(res.data.temperature),
        timestamp: Date.now(),
      }
    });

    this.props.popPending();
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(null, mapDispatchToProps)(Weather);
