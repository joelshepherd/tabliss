import { DateTime } from 'luxon';

// @TODO Revisit this to not be dodge
export function getConvertedDate() {
  return new Date(
    DateTime.local().toLocaleString({
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     hour: 'numeric',
     minute: 'numeric',
     second: 'numeric',
     // Drop timezone information as its already been adjusted
   })
  );
}
