import { settings } from './settings';
import { setLocale, setTimeZone, switchProfile } from '../actions/settings';

describe('settings() reducer', () => {
  const state = {
    locale: 'en-GB',
    profileId: '00000000-0000-0000-0000-000000000000',
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

  it('should switch profile', () => {
    expect(settings(state, switchProfile('1234'))).toEqual({
      ...state,
      profileId: '1234',
    });
  });
});
