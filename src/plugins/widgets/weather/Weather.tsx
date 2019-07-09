import React, { FC, useEffect } from 'react';

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
  useEffect(() => {
    getForecast(data, loader).then(setCache);
  }, [data]);

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
        <i
          dangerouslySetInnerHTML={{
            __html: weatherIcons[cache.icon],
          }}
        />
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
