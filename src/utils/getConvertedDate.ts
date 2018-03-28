import { DateTime } from 'luxon';

export function getConvertedDate() {
  const localDate = DateTime.local();

  return new Date(
    localDate.year,
    (localDate.month - 1), // JS Date objects number months from 0, luxon from 1
    localDate.day,
    localDate.hour,
    localDate.minute,
    localDate.second,
  );
}
