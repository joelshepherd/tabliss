import { useEffect, useState } from 'react';
import { utcToZonedTime } from 'date-fns-tz';

import { useSelector } from '../store';

export function useTime() {
  const timeZone = useSelector(state => state.settings.timeZone);

  const [state, setState] = useState(getTime(timeZone));

  useEffect(() => {
    const interval = setInterval(() => setState(getTime(timeZone)), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return state;
}

function getTime(timeZone?: string) {
  if (timeZone) {
    return utcToZonedTime(new Date(), timeZone);
  }

  return new Date();
}
