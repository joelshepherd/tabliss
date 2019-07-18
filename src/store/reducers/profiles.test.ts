import { profiles } from './profiles';
import { addProfile, removeProfile, setProfile } from '../actions/profiles';

describe('profiles() reducer', () => {
  const state = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Default',
      backgrounds: [],
      widgets: [],
      data: {},
    },
  ];

  it('should add new profiles', () => {
    expect(profiles(state, addProfile('New Profile'))).toEqual([
      ...state,
      {
        id: expect.any(String),
        name: 'New Profile',
        backgrounds: expect.any(Array),
        widgets: expect.any(Array),
        data: {},
      },
    ]);
  });

  it('should update profiles', () => {
    expect(
      profiles(
        state,
        setProfile('00000000-0000-0000-0000-000000000000', 'New Name'),
      ),
    ).toEqual([
      {
        ...state[0],
        name: 'New Name',
      },
    ]);
  });

  it('should remove profiles', () => {
    expect(
      profiles(state, removeProfile('00000000-0000-0000-0000-000000000000')),
    ).toEqual([]);
  });
});
