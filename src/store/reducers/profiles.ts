import { v4 as generateId } from 'uuid';

import { ProfileState, defaultProfile, profile } from './profile';
import { ProfileActions } from '../actions/profile';

export function addProfile(name: string) {
  return {
    type: 'ADD_PROFILE',
    data: { name },
  } as const;
}

export function removeProfile(id: string) {
  return {
    type: 'REMOVE_PROFILE',
    data: { id },
  } as const;
}

export function setProfile(id: string) {
  return {
    type: 'SET_PROFILE',
    data: { id },
  } as const;
}

type ProfilesActions =
  | ReturnType<typeof addProfile>
  | ReturnType<typeof removeProfile>
  | ReturnType<typeof setProfile>;

export type ProfilesState = {
  activeId: string;
  profiles: ProfileState[];
};

const initialState: ProfilesState = {
  activeId: '00000000-0000-0000-0000-000000000000',
  profiles: [],
};

export function profiles(
  state = initialState,
  action: ProfilesActions | ProfileActions,
): ProfilesState {
  switch (action.type) {
    case 'ADD_PROFILE':
      return {
        ...state,
        profiles: state.profiles.concat({
          ...defaultProfile,
          id: generateId(),
          name: action.data.name,
        }),
      };

    case 'REMOVE_PROFILE':
      return {
        ...state,
        profiles: state.profiles.filter(p => p.id === action.data.id),
      };

    case 'SET_PROFILE':
      return {
        ...state,
        activeId: action.data.id,
      };

    default:
      return {
        ...state,
        profiles: state.profiles.map(p =>
          p.id === state.activeId ? profile(p, action) : p,
        ),
      };
  }
}
