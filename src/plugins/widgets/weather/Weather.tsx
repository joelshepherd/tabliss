import React from "react";
import { defineMessages } from "react-intl";
import { useCachedEffect, useFormatMessages, useTime } from "../../../hooks";
import { HOURS } from "../../../utils";
import { Icon } from "../../../views/shared";
import { getForecast } from "./api";
import { weatherCodes } from "./icons";
import { defaultData, Props } from "./types";
import "./Weather.sass";

const messages = defineMessages({
  high: {
    id: "plugins.weather.high",
    description: "High for temperature high",
    defaultMessage: "High",
  },
  low: {
    id: "plugins.weather.low",
    description: "Low for temperature low",
    defaultMessage: "Low",
  },
  apparent: {
    id: "plugins.weather.apparent",
    description: "Apparent/Feels like tempurature",
    defaultMessage: "Feels like",
  },
  humidity: {
    id: "plugins.weather.humidity",
    description: "Humidity",
    defaultMessage: "Humidity",
  },
});

const Weather: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  const time = useTime("absolute");
  const translated = useFormatMessages(messages);

  useCachedEffect(
    () => {
      getForecast(data, loader).then(setCache);
    },
    cache ? cache.timestamp + 6 * HOURS : 0,
    [data.latitude, data.latitude, data.units],
  );

  // `cache.conditions` check is to guard the version upgrade
  if (!cache || !cache.conditions) {
    return <div className="Weather">-</div>;
  }

  // Find conditions for the current time
  const now = time.getTime() / 1000;
  const conditions = cache.conditions
    .slice()
    .reverse()
    .find((condition) => now >= condition.timestamp);

  // Calculate 24 hours of precipitation
  const rain = Math.round(
    cache.conditions
      .filter(
        (condition) =>
          condition.timestamp > now &&
          condition.timestamp < now + (24 * HOURS) / 1000,
      )
      .reduce((count, condition) => count + condition.precipitation, 0),
  );

  if (!conditions) {
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
        <Icon name={weatherCodes[conditions.weathercode]} />
        <span className="temperature">{conditions.temperature}˚</span>
      </div>

      {data.showDetails && (
        <div className="details">
          <dl>
            <dt>{conditions.apparentTemperature}˚</dt>
            <dd>{translated.apparent}</dd>
          </dl>
          <dl>
            <dt>{conditions.humidity}%</dt>
            <dd>{translated.humidity}</dd>
          </dl>
          <dl>
            <dt>{rain}mm</dt>
            <dd>Rain next 24 hours</dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Weather;
