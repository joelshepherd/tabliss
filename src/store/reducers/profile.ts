import { v4 as generateId } from 'uuid';

import { ProfileActions } from '../actions/profile';

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

interface PluginState {
  id: string;
  type: string;
  active: boolean;
}

export interface BackgroundState extends PluginState {
  luminosity: number; // Positive to lighten, negative to darken
  blur: number;
}

export interface WidgetState extends PluginState {
  position: WidgetPosition;
  fontFamily?: string;
  fontSize?: string;
}

export interface ProfileState {
  id: string;
  name: string;
  backgrounds: BackgroundState[];
  widgets: WidgetState[];
  data: { [id: string]: object };
}

export const defaultProfile: Pick<
  ProfileState,
  'backgrounds' | 'data' | 'widgets'
> = {
  backgrounds: [
    {
      id: generateId(),
      type: 'background/colour',
      active: true,
      luminosity: 0,
      blur: 0,
    },
  ],
  widgets: [
    {
      id: generateId(),
      type: 'widget/time',
      active: true,
      position: 'middleCentre',
    },
    {
      id: generateId(),
      type: 'widget/greeting',
      active: true,
      position: 'middleCentre',
    },
  ],
  data: {},
};

const initialState: ProfileState = {
  ...defaultProfile,
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Default',
};

export function profile(
  state = initialState,
  action: ProfileActions,
): ProfileState {
  switch (action.type) {
    case 'SET_BACKGROUND':
      let newState = { ...state };

      if (
        !state.backgrounds.map(plugin => plugin.type).includes(action.data.type)
      ) {
        newState.backgrounds = newState.backgrounds.concat({
          id: generateId(),
          type: action.data.type,
          active: true,
          luminosity: 0,
          blur: 0,
        });
      }

      return {
        ...newState,
        backgrounds: newState.backgrounds.map(plugin => ({
          ...plugin,
          active: plugin.type === action.data.type,
        })),
      };

    case 'ADD_WIDGET':
      return {
        ...state,
        widgets: state.widgets.concat({
          id: generateId(),
          type: action.data.type,
          active: true,
          position: 'middleCentre',
        }),
      };

    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter(plugin => plugin.id !== action.data.id),
      };

    // @todo Reorder widget?

    case 'SET_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [action.data.id]: action.data.data,
        },
      };

    case 'SET_POSITION':
      return {
        ...state,
        widgets: state.widgets.map(plugin =>
          plugin.id === action.data.id
            ? { ...plugin, position: action.data.position }
            : plugin,
        ),
      };

    case 'SET_BLUR':
      return {
        ...state,
        backgrounds: state.backgrounds.map(plugin =>
          plugin.active ? { ...plugin, blur: action.data.blur } : plugin,
        ),
      };

    case 'SET_LUMINOSITY':
      return {
        ...state,
        backgrounds: state.backgrounds.map(plugin =>
          plugin.active
            ? { ...plugin, luminosity: action.data.luminosity }
            : plugin,
        ),
      };
  }

  return state;
}
