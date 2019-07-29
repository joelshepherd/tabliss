import { v4 as generateId } from 'uuid';

import { Actions } from '../actions';

export type BackgroundDisplay = {
  blur: number;
  luminosity: number;
};

export type WidgetPosition =
  | 'topLeft'
  | 'topCentre'
  | 'topRight'
  | 'middleLeft'
  | 'middleCentre'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomCentre'
  | 'bottomRight';

export type WidgetDisplay = {
  colour?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  position: WidgetPosition;
};

interface PluginState {
  id: string;
  /**
   * May not exactly match plugin keys.
   * Keys of removed plugins may still exist in a browser's storage for instance
   */
  key: string;
  active: boolean;
}

export interface BackgroundState extends PluginState {
  display: BackgroundDisplay;
}

export interface WidgetState extends PluginState {
  display: WidgetDisplay;
}

export interface DataState {
  backgrounds: BackgroundState[];
  widgets: WidgetState[];
  data: {
    [id: string]: object;
  };
  locale?: string;
  timeZone?: string;
}

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
    case 'MIGRATE_STORE':
      return action.data.state;

    case 'RESET_STORE':
      return initialState;

    case 'SET_BACKGROUND':
      let newState = { ...state };

      if (
        !state.backgrounds.map(plugin => plugin.key).includes(action.data.key)
      ) {
        newState.backgrounds = newState.backgrounds.concat({
          id: generateId(),
          key: action.data.key,
          active: true,
          display: { luminosity: 0, blur: 0 },
        });
      }

      return {
        ...newState,
        backgrounds: newState.backgrounds.map(plugin => ({
          ...plugin,
          active: plugin.key === action.data.key,
        })),
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
          plugin.id === action.data.id
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

    default:
      return state;
  }
}
