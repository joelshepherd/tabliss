import React, { FC, createContext, useEffect, useState } from 'react';
import { utcToZonedTime } from 'date-fns-tz';

import { useSelector } from '../store';

// `defaultValue` here is irrelevant as it will be replaced in the provider
export const TimeContext = createContext(new Date());

function getTime(timeZone?: string) {
  if (timeZone) {
    return utcToZonedTime(new Date(), timeZone);
  }

  return new Date();
}

const TimeProvider: FC = ({ children }) => {
  const timeZone = useSelector(state => state.data.timeZone);

  const [time, setTime] = useState(getTime(timeZone));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime(timeZone)), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
