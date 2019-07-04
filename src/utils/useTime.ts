import { useEffect, useState } from 'react';
import { getConvertedDate } from './getConvertedDate';

export function useTime() {
  const [state, setState] = useState(getConvertedDate());

  useEffect(() => {
    const interval = setInterval(() => setState(getConvertedDate()), 1000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
