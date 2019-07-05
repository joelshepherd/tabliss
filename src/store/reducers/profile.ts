import { v4 as generateId } from 'uuid';

import { ProfileActions } from '../actions/profile';

export type PluginPosition =
  | 'background'
  | 'topLeft'
  | 'topCentre'
  | 'topRight'
  | 'middleLeft'
  | 'middleCentre'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomCentre'
  | 'bottomRight';

export interface PluginState {
  id: string;
  type: string;
  active: boolean;
  position: PluginPosition;
  data?: object;
}

export interface ProfileState {
  id: string;
  name: string;
  plugins: PluginState[];
}

export const defaultProfile: Pick<ProfileState, 'plugins'> = {
  plugins: [
    {
      id: generateId(),
      type: 'background/colour',
      active: true,
      position: 'background',
    },
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
        !state.plugins.map(plugin => plugin.type).includes(action.data.type)
      ) {
        newState.plugins = newState.plugins.concat({
          id: generateId(),
          type: action.data.type,
          active: true,
          position: 'background',
        });
      }

      return {
        ...newState,
        plugins: newState.plugins.map(plugin =>
          plugin.position === 'background'
            ? { ...plugin, active: plugin.type === action.data.type }
            : plugin,
        ),
      };

    case 'ADD_WIDGET':
      return {
        ...state,
        plugins: state.plugins.concat({
          id: generateId(),
          type: action.data.type,
          active: true,
          position: 'middleCentre',
        }),
      };

    case 'REMOVE_WIDGET':
      return {
        ...state,
        plugins: state.plugins.filter(plugin => plugin.id !== action.data.id),
      };

    // @todo Reorder widget?

    case 'SET_DATA':
      return {
        ...state,
        plugins: state.plugins.map(plugin =>
          plugin.id === action.data.id
            ? { ...plugin, data: action.data.data }
            : plugin,
        ),
      };

    case 'SET_POSITION':
      return {
        ...state,
        plugins: state.plugins.map(plugin =>
          plugin.id === action.data.id
            ? { ...plugin, position: action.data.position }
            : plugin,
        ),
      };
  }

  return state;
}
