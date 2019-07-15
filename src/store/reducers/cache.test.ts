import { cache } from './cache';
import { setCache } from '../actions/cache';

describe('cache() reducer', () => {
  it('should set cache data', () => {
    expect(cache({}, setCache('1234', { key: 'test' }))).toEqual({
      '1234': { key: 'test' },
    });
  });

  it('should clear cache on undefined action', () => {
    expect(
      cache(
        {
          '1234': { key: 'test' },
        },
        setCache('1234', undefined),
      ),
    ).toEqual({});
  });
});
