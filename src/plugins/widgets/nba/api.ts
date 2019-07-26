import { addMinutes, format, subMinutes, startOfDay} from 'date-fns';
import { getClient } from './getClient';
import { gameQuery as query } from './query';

export function getEstString(date:Date) {
  const est = subMinutes(addMinutes(startOfDay(date), date.getTimezoneOffset()), 240);
  return format(est, 'yyyyMMdd');
};

export async function getCurrentGames(date: Date) {
  const client = await getClient();
  const { data } = await client.query({query, variables: {date: getEstString(new Date())}});
  return data ? data.schedule : [];
}
