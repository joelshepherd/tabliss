import { cache } from './cache';
import { removeWidget, setCache, resetStore } from '../actions';

describe('cache() reducer', () => {
  it('should set cache data', () => {
    expect(cache({}, setCache('1234', { key: 'test' }))).toEqual({
      '1234': { key: 'test' },
    });
  });

  it('should clear cache on undefined action', () => {
    expect(
      cache({ '1234': { key: 'test' } }, setCache('1234', undefined)),
    ).toEqual({});
  });

  it('should clear cache when plugin is removed', () => {
    expect(
      cache({ '1234': { key: 'test' }, '5678': {} }, removeWidget('1234')),
    ).toEqual({ '5678': {} });
  });

  it('should clear all cache when store is reset', () => {
    expect(
      cache({ '1234': { key: 'test' }, '5678': {} }, resetStore()),
    ).toEqual({});
  });
});
