import { settings } from './settings';
import { setLocale } from '../actions/settings';

describe('settings() reducer', () => {
  it('should set locale', () => {
    expect(settings({}, setLocale('en-AU'))).toEqual({ locale: 'en-AU' });
  });
});
