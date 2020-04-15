import React, { FC } from 'react';
import { defineMessages } from 'react-intl';

import { useCachedEffect, useFormatMessages } from '../../../hooks';
import { Icon } from '../../../views/shared';
import { getForecast } from './api';
import { weatherIcons } from './icons';
import { defaultData, Props } from './types';
import './Weather.sass';

const messages = defineMessages({
  high: {
    id: 'plugins.weather.high',
    description: 'High for temperature high',
    defaultMessage: 'High',
  },
  low: {
    id: 'plugins.weather.low',
    description: 'Low for temperature low',
    defaultMessage: 'Low',
  },
});

const Weather: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  const translated = useFormatMessages(messages);

  useCachedEffect(
    () => {
      getForecast(data, loader).then(setCache);
    },
    cache ? cache.expiresAt : 0,
    [data.latitude, data.latitude, data.units],
  );

  if (!cache) {
    return <div className="Weather">-</div>;
  }

  return (
    <div className="Weather">
      <div
        className="summary"
        onClick={() => setData({ ...data, showDetails: !data.showDetails })}
        title="Toggle weather details"
      >
        {data.name && <span>{data.name}</span>}
        <Icon name={weatherIcons[cache.icon]} />
        <span className="temperature">
          <span title={translated.high}>{cache.temperatureHigh}˚</span>{' '}
          <span title={translated.low}>{cache.temperatureLow}˚</span>
        </span>
      </div>

      {data.showDetails && (
        <div className="details">
          <dl>
            <dt>
              <span title={translated.high}>
                {cache.apparentTemperatureHigh}˚
              </span>{' '}
              <span title={translated.low}>
                {cache.apparentTemperatureLow}˚
              </span>
            </dt>
            <dd>Feels like</dd>
          </dl>
          <dl>
            <dt>{cache.humidity}%</dt>
            <dd>Humidity</dd>
          </dl>
          <dl>
            <dt>{cache.precipProbability}%</dt>
            <dd>Chance of {cache.precipType || 'rain'}</dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Weather;
