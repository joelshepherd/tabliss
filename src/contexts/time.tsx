import React, { FC, createContext, useEffect, useState } from "react";
import { utcToZonedTime } from "date-fns-tz";

import { useSelector } from "../store";

type Time = {
  absolute: Date;
  zoned: Date;
};

function getTime(timeZone?: string): Time {
  const absolute = new Date();
  const zoned = timeZone ? utcToZonedTime(absolute, timeZone) : absolute;

  return { absolute, zoned };
}

// `defaultValue` here is irrelevant as it will be replaced in the provider
export const TimeContext = createContext(getTime());

const TimeProvider: FC = ({ children }) => {
  const timeZone = useSelector((state) => state.data.timeZone);

  const [time, setTime] = useState(getTime(timeZone));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime(timeZone)), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
