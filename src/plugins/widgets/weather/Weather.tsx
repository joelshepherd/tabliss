import React, { FC } from 'react';

import { useCachedEffect } from '../../../hooks';
import { Icon } from '../../../views/shared';
import { getForecast } from './api';
import { weatherIcons } from './icons';
import { Props, defaultData } from './types';
import './Weather.sass';

const Weather: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
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
          {cache.temperatureHigh}˚{cache.temperatureLow}˚
        </span>
      </div>

      {data.showDetails && (
        <div className="details">
          <dl>
            <dt>
              {cache.apparentTemperatureHigh}˚{cache.apparentTemperatureLow}˚
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
