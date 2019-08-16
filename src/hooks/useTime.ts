import { useContext } from 'react';

import { TimeContext } from '../contexts/time';

export function useTime() {
  return useContext(TimeContext);
}
