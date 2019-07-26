import React, { FC } from 'react';

import { useExpiringCache } from '../../../utils/useCache';
import { Icon } from '../../../views/shared';
import { getForecast } from './api';
import { weatherIcons } from './icons';
import { Props, defaultData } from './types';
import './Weather.sass';

const EXPIRE_IN = 15 * 60 * 1000; // 15 minutes

const Weather: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  useExpiringCache(
    () => {
      getForecast(data, loader).then(setCache);
    },
    cache ? cache.timestamp + EXPIRE_IN : 0,
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
        <Icon name={weatherIcons[cache.icon]} />
        <span className="temperature">{cache.temperature}˚</span>
      </div>

      {data.showDetails && (
        <div className="details">
          <dl>
            <dt>{cache.humidity}%</dt>
            <dd>Humidity</dd>
          </dl>
          <dl>
            <dt>{cache.precipProbability}%</dt>
            <dd>Chance of {cache.precipType || 'rain'}</dd>
          </dl>
          <dl>
            <dt>{cache.apparentTemperature}˚</dt>
            <dd>Feels like</dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Weather;
