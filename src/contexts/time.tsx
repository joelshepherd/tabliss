import { utcToZonedTime } from "date-fns-tz";
import React, { createContext, FC, useEffect, useState } from "react";
import { useKey } from "../lib/db/react";
import { db } from "../state";

type Time = {
  absolute: Date;
  zoned: Date;
};

function getTime(timeZone: string | null = null): Time {
  const absolute = new Date();
  const zoned = timeZone ? utcToZonedTime(absolute, timeZone) : absolute;

  return { absolute, zoned };
}

// `defaultValue` here is irrelevant as it will be replaced in the provider
export const TimeContext = createContext(getTime());

const TimeProvider: FC = ({ children }) => {
  const [timeZone] = useKey(db, "timeZone");
  const [time, setTime] = useState(getTime(timeZone));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime(timeZone)), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
