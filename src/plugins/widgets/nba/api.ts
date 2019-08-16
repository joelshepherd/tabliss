import { startOfDay } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { getClient } from './getClient';
import { gameQuery as query } from './query';

function getEstString(date:Date) {
  const dateUTC = zonedTimeToUtc(startOfDay(date), Intl.DateTimeFormat().resolvedOptions().timeZone);
  const dateEST = utcToZonedTime(dateUTC, 'EST');
  return format(dateEST, 'yyyyMMdd');
};

export async function getCurrentGames(date: Date) {
  const client = await getClient();
  const { data } = await client.query({query, variables: {date: getEstString(date)}});
  return data ? data.schedule : [];
}
