import { ProfileState, PluginState, profile } from './profile';
import { addWidget, removeWidget } from '../actions/profile';

const baseProfile: ProfileState = {
  id: '1234',
  name: 'Test Profile',
  plugins: [],
};

const basePlugin: PluginState = {
  id: '1234',
  type: 'widget/test',
  active: true,
  position: 'middleCentre',
};

describe('profile()', () => {
  it('should add widget', () => {
    expect(profile(baseProfile, addWidget('widget/test-add'))).toEqual({
      ...baseProfile,
      plugins: [
        {
          id: expect.any(String),
          type: 'widget/test-add',
          active: true,
          position: 'middleCentre',
          data: undefined,
        },
      ],
    });
  });

  it('should remove widget', () => {
    expect(
      profile(
        {
          ...baseProfile,
          plugins: [basePlugin, { ...basePlugin, id: '5678' }],
        },
        removeWidget('5678'),
      ),
    ).toEqual({
      ...baseProfile,
      plugins: [basePlugin],
    });
  });
});
