import { CHANGE_LOCALE, CHANGE_TIMEZONE } from '../constants';

export function changeLocale(locale: string) {
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
}

export function changeTimezone(timezone?: string) {
  return {
    type: CHANGE_TIMEZONE,
    payload: timezone,
  };
}
