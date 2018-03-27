import { DateTime } from 'luxon';

export function getConvertedDate() {
  const localDate = DateTime.local();

  return new Date(
    localDate.year,
    localDate.month,
    localDate.day,
    localDate.hour,
    localDate.minute,
    localDate.second,
  );
}
