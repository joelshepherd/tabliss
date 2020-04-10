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
    [data.latitude, data.latitude, data.units, data.name],
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
        <Icon name={weatherIcons[cache.icon]} />
        <span className="temperature">
          {cache.temperatureLow}-{cache.temperatureHigh}˚
        </span>
        {cache.name && <dd>{cache.name}</dd>}
      </div>

      {data.showDetails && (
        <div className="details">
          <dl>
            <dt>
              {cache.apparentTemperatureLow}-{cache.apparentTemperatureHigh}˚
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
