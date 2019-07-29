import { DataState, data, WidgetState } from './data';
import { addWidget, removeWidget, setLocale, setTimeZone } from '../actions';

const state: DataState = {
  backgrounds: [],
  widgets: [],
  data: {},
};

const baseWidget: WidgetState = {
  id: '1234',
  key: 'widget/test',
  active: true,
  display: { position: 'middleCentre' },
};

describe('data() reducer', () => {
  it('should add widget', () => {
    expect(data(state, addWidget('widget/test-add'))).toEqual({
      ...state,
      widgets: [
        {
          id: expect.any(String),
          key: 'widget/test-add',
          active: true,
          display: { position: 'middleCentre' },
        },
      ],
    });
  });

  it('should remove widget', () => {
    expect(
      data(
        {
          ...state,
          widgets: [baseWidget, { ...baseWidget, id: '5678' }],
        },
        removeWidget('5678'),
      ),
    ).toEqual({
      ...state,
      widgets: [baseWidget],
    });
  });

  // @todo Test reorder widget

  it('should set locale', () => {
    expect(data(state, setLocale('en-AU'))).toEqual({
      ...state,
      locale: 'en-AU',
    });
  });

  it('should set time zone', () => {
    expect(data(state, setTimeZone('Australia/Brisbane'))).toEqual({
      ...state,
      timeZone: 'Australia/Brisbane',
    });
  });
});
