import { utcToZonedTime } from "date-fns-tz";
import React from "react";
import { db } from "../db/state";
import { useValue } from "../lib/db/react";

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
export const TimeContext = React.createContext(getTime());

const TimeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const timeZone = useValue(db, "timeZone");
  const [time, setTime] = React.useState(getTime(timeZone));

  React.useEffect(() => {
    setTime(getTime(timeZone));
    const interval = setInterval(() => setTime(getTime(timeZone)), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
