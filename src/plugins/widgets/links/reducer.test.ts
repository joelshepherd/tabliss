import { reducer } from './reducer';

describe('links/reducer()', () => {
  it('should add new links', () => {
    expect(reducer([], { type: 'ADD_LINK' })).toEqual([{ url: 'https://' }]);
    expect(
      reducer([{ url: 'https://tabliss.io/' }], { type: 'ADD_LINK' }),
    ).toEqual([{ url: 'https://tabliss.io/' }, { url: 'https://' }]);
  });

  it('should remove links', () => {
    expect(
      reducer(
        [
          { url: 'https://tabliss.io/' },
          { url: 'https://tabliss.io/about.html' },
        ],
        {
          type: 'REMOVE_LINK',
          data: { index: 0 },
        },
      ),
    ).toEqual([{ url: 'https://tabliss.io/about.html' }]);
  });

  it('should update links', () => {
    expect(
      reducer(
        [
          { url: 'https://tabliss.io/' },
          { url: 'https://tabliss.io/about.html' },
        ],
        {
          type: 'UPDATE_LINK',
          data: {
            index: 0,
            link: { name: 'Tabliss', url: 'https://tabliss.io/' },
          },
        },
      ),
    ).toEqual([
      { name: 'Tabliss', url: 'https://tabliss.io/' },
      { url: 'https://tabliss.io/about.html' },
    ]);
  });

  it('should reorder links', () => {
    expect(
      reducer(
        [
          { url: 'https://tabliss.io/' },
          { url: 'https://tabliss.io/about.html' },
          { url: 'https://tabliss.io/support.html' },
        ],
        {
          type: 'REORDER_LINK',
          data: { index: 1, to: 0 },
        },
      ),
    ).toEqual([
      { url: 'https://tabliss.io/about.html' },
      { url: 'https://tabliss.io/' },
      { url: 'https://tabliss.io/support.html' },
    ]);

    expect(
      reducer(
        [
          { url: 'https://tabliss.io/' },
          { url: 'https://tabliss.io/about.html' },
          { url: 'https://tabliss.io/support.html' },
        ],
        {
          type: 'REORDER_LINK',
          data: { index: 1, to: 2 },
        },
      ),
    ).toEqual([
      { url: 'https://tabliss.io/' },
      { url: 'https://tabliss.io/support.html' },
      { url: 'https://tabliss.io/about.html' },
    ]);
  });

  it('should throw on unknown action', () => {
    expect(() => reducer([], { type: 'UNKNOWN' } as any)).toThrow();
  });
});
