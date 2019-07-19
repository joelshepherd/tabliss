import { ProfileState, profile, WidgetState } from './profile';
import { addWidget, removeWidget } from '../actions/profile';

const baseProfile: ProfileState = {
  backgrounds: [],
  widgets: [],
  data: {},
};

const baseWidget: WidgetState = {
  id: '1234',
  type: 'widget/test',
  active: true,
  display: { position: 'middleCentre' },
};

describe('profile() reducer', () => {
  it('should add widget', () => {
    expect(profile(baseProfile, addWidget('widget/test-add'))).toEqual({
      ...baseProfile,
      widgets: [
        {
          id: expect.any(String),
          type: 'widget/test-add',
          active: true,
          display: { position: 'middleCentre' },
        },
      ],
    });
  });

  it('should remove widget', () => {
    expect(
      profile(
        {
          ...baseProfile,
          widgets: [baseWidget, { ...baseWidget, id: '5678' }],
        },
        removeWidget('5678'),
      ),
    ).toEqual({
      ...baseProfile,
      widgets: [baseWidget],
    });
  });
});
