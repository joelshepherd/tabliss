import get from 'lodash-es/get';
import React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../data';
import { weatherIcons } from './icons';
import { Conditions, Settings } from './interfaces';
import './Weather.sass';

interface Props extends Settings {
  local: Local;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  updateLocal: (state: Partial<Local>) => void;
}

interface Local {
  conditions: Conditions;
  details: boolean;
}

class Weather extends React.PureComponent<Props> {
  static defaultProps = {
    mode: 'corner',
    units: 'auto',
  };

  componentWillMount() {
    if (this.shouldRefresh()) {
      this.getForecast();
    }
  }

  componentWillReceiveProps(props: Props) {
    if (
      props.latitude !== this.props.latitude ||
      props.longitude !== this.props.longitude ||
      props.units !== this.props.units
    ) {
      this.getForecast(props);
    }
  }

  render() {
    if (!get(this.props, 'local.conditions')) {
      return <div className={`Weather ${this.props.mode}`}>-</div>;
    }

    return (
      <div className={`Weather ${this.props.mode}`}>
        <div
          className="summary"
          onClick={this.toggleExpand}
          title="Toggle weather details"
        >
          <i
            dangerouslySetInnerHTML={{
              __html: weatherIcons[this.props.local.conditions.icon],
            }}
          />
          <span className="temperature">
            {this.props.local.conditions.temperature}˚
          </span>
        </div>

        {this.props.mode === 'corner' && this.props.local.details && (
          <div className="details">
            <dl>
              <dt>{this.props.local.conditions.humidity}%</dt>
              <dd>Humidity</dd>
            </dl>
            <dl>
              <dt>{this.props.local.conditions.precipProbability}%</dt>
              <dd>
                Chance of {this.props.local.conditions.precipType || 'rain'}
              </dd>
            </dl>
            <dl>
              <dt>{this.props.local.conditions.apparentTemperature}˚</dt>
              <dd>Feels like</dd>
            </dl>
          </div>
        )}
      </div>
    );
  }

  private toggleExpand = () => {
    if (this.props.mode === 'corner') {
      this.props.updateLocal({ details: !this.props.local.details });
    }
  };

  private shouldRefresh() {
    return (
      get(this.props, 'local.conditions.timestamp', 0) + 900000 < Date.now()
    );
  }

  private async getForecast(
    { latitude, longitude, units }: Props = this.props,
  ) {
    // Validate we have all required settings
    if (!(latitude && longitude && units)) {
      return;
    }

    this.props.pushPending();

    const req = new Request(
      `${
        process.env.API_ENDPOINT
      }/forecast?latitude=${latitude}&longitude=${longitude}&units=${units}`,
    );
    const res = await (await fetch(req)).json();

    this.props.updateLocal({
      conditions: {
        ...res.data,
        apparentTemperature: Math.round(res.data.apparentTemperature),
        humidity: Math.round(res.data.humidity * 100),
        precipProbability: Math.round(res.data.precipProbability * 100),
        temperature: Math.round(res.data.temperature),
        timestamp: Date.now(),
      },
    });

    this.props.popPending();
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(
  null,
  mapDispatchToProps,
)(Weather);
