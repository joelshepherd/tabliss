import React, { FC } from "react";
import { FormattedRelativeTime } from "react-intl";

import { useTime } from "../../../hooks";
import { Props, defaultData } from "./types";

function selectUnit(from: number, to: number) {
  const secs = (from - to) / 1000;
  if (Math.abs(secs) < 45) {
    return {
      value: Math.round(secs),
      unit: "second" as const,
    };
  }

  const mins = secs / 60;
  if (Math.abs(mins) < 45) {
    return {
      value: Math.round(mins),
      unit: "minute" as const,
    };
  }

  const hours = mins / 60;
  if (Math.abs(hours) < 22) {
    return {
      value: Math.round(hours),
      unit: "hour" as const,
    };
  }

  const days = hours / 24;
  if (Math.abs(days) < 365) {
    return {
      value: Math.round(days),
      unit: "day" as const,
    };
  }

  const years = days / 360;
  return {
    value: Math.round(years),
    unit: "year" as const,
  };
}

const Countdown: FC<Props> = ({ data = defaultData }) => {
  const currentTime = useTime();
  const { value, unit } = selectUnit(data.time, currentTime.getTime());

  return (
    <div className="Countdown">
      <h3>
        {currentTime.getTime() >= data.time ? (
          "It is time"
        ) : (
          <FormattedRelativeTime value={value} unit={unit} />
        )}
      </h3>
      {data.title && <h4>{data.title}</h4>}
    </div>
  );
};

export default Countdown;
