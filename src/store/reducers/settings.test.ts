import { settings } from './settings';
import { setLocale, setTimeZone } from '../actions/settings';

describe('settings() reducer', () => {
  const state = {
    locale: 'en-GB',
    timeZone: 'UTC',
  };

  it('should set locale', () => {
    expect(settings(state, setLocale('en-AU'))).toEqual({
      ...state,
      locale: 'en-AU',
    });
  });

  it('should set time zone', () => {
    expect(settings(state, setTimeZone('Australia/Brisbane'))).toEqual({
      ...state,
      timeZone: 'Australia/Brisbane',
    });
  });
});
