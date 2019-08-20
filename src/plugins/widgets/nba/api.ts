import { startOfDay } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { API } from '../../types';
import { gameQuery as query } from './query';

function getEstString(date: Date) {
  const dateUTC = zonedTimeToUtc(
    startOfDay(date),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const dateEST = utcToZonedTime(dateUTC, 'EST');
  return format(dateEST, 'yyyyMMdd');
}

export async function getCurrentGames(loader: API['loader']) {
  loader.push();
  const { data } = await fetch('https://nba.rickyg.io/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query(getEstString(new Date())) }),
  })
    .then(res => res.json())
    .finally(() => loader.pop());

  return data ? data.schedule : [];
}
