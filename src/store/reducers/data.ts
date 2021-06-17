import { v4 as generateId } from 'uuid';

import { Actions } from '../actions';
import { DataState } from './types';

export const initialState: DataState = {
  backgrounds: [
    {
      id: generateId(),
      key: 'background/unsplash',
      active: true,
      display: { luminosity: -0.1, blur: 0 },
    },
  ],
  widgets: [
    {
      id: generateId(),
      key: 'widget/time',
      active: true,
      display: { position: 'middleCentre' },
    },
    {
      id: generateId(),
      key: 'widget/greeting',
      active: true,
      display: { position: 'middleCentre' },
    },
  ],
  data: {},
};

export function data(state = initialState, action: Actions): DataState {
  switch (action.type) {
    case 'RESET_STORE':
      return action.data.state || initialState;

    case 'SET_BACKGROUND':
      return {
        ...state,
        backgrounds: [
          {
            id: generateId(),
            key: action.data.key,
            active: true,
            display: { luminosity: 0, blur: 0 },
          },
        ],
      };

    case 'ADD_WIDGET':
      return {
        ...state,
        widgets: state.widgets.concat({
          id: generateId(),
          key: action.data.key,
          active: true,
          display: { position: 'middleCentre' },
        }),
      };

    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter(plugin => plugin.id !== action.data.id),
      };

    case 'REORDER_WIDGET':
      const widgets = [...state.widgets];
      const index = widgets.findIndex(widget => widget.id === action.data.id);
      widgets.splice(action.data.to, 0, widgets.splice(index, 1)[0]);

      return {
        ...state,
        widgets,
      };

    case 'SET_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [action.data.id]: action.data.data,
        },
      };

    case 'SET_BACKGROUND_DISPLAY':
      return {
        ...state,
        backgrounds: state.backgrounds.map(plugin =>
          plugin.active
            ? {
                ...plugin,
                display: { ...plugin.display, ...action.data.display },
              }
            : plugin,
        ),
      };

    case 'SET_WIDGET_DISPLAY':
      return {
        ...state,
        widgets: state.widgets.map(plugin =>
          plugin.id === action.data.id
            ? {
                ...plugin,
                display: { ...plugin.display, ...action.data.display },
              }
            : plugin,
        ),
      };

    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.data.locale,
      };

    case 'SET_TIME_ZONE':
      return {
        ...state,
        timeZone: action.data.timeZone,
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.data.theme,
      };

    default:
      return state;
  }
}
