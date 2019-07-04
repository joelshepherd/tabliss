import React, { FC, useEffect } from 'react';

import { getForecast } from './api';
import { weatherIcons } from './icons';
import { Conditions, Props, defaultCache, defaultData } from './types';
import './Weather.sass';

const Weather: FC<Props> = ({
  cache = defaultCache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const setConditions = (conditions?: Conditions) =>
    setCache({ ...cache, conditions });

  useEffect(() => {
    getForecast(data, loader).then(setConditions);
  }, [data]);

  if (!cache.conditions) {
    return <div className={`Weather ${data.mode}`}>-</div>;
  }

  // Check for expired cache
  if (cache.conditions.timestamp + 900000 < Date.now()) {
    getForecast(data, loader).then(setConditions);
  }

  return (
    <div className={`Weather ${data.mode}`}>
      <div
        className="summary"
        onClick={() => setCache({ ...cache, details: !cache.details })}
        title="Toggle weather details"
      >
        <i
          dangerouslySetInnerHTML={{
            __html: weatherIcons[cache.conditions.icon],
          }}
        />
        <span className="temperature">{cache.conditions.temperature}˚</span>
      </div>

      {data.mode === 'corner' && cache.details && (
        <div className="details">
          <dl>
            <dt>{cache.conditions.humidity}%</dt>
            <dd>Humidity</dd>
          </dl>
          <dl>
            <dt>{cache.conditions.precipProbability}%</dt>
            <dd>Chance of {cache.conditions.precipType || 'rain'}</dd>
          </dl>
          <dl>
            <dt>{cache.conditions.apparentTemperature}˚</dt>
            <dd>Feels like</dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Weather;
