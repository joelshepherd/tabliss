import { getConvertedDate } from './getConvertedDate';

describe('getConvertedDate()', () => {
  test('it has the correct year', () => {
    expect(getConvertedDate().getFullYear()).toBe(new Date().getFullYear());
  });

  test('it has the correct month', () => {
    expect(getConvertedDate().getMonth()).toBe(new Date().getMonth());
  });

  test('it has the correct day', () => {
    expect(getConvertedDate().getDay()).toBe(new Date().getDay());
  });
});
