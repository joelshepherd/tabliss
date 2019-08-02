import { useContext } from 'react';

import { TimeContext } from '../context/time';

export function useTime() {
  return useContext(TimeContext);
}
