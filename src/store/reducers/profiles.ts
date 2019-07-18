import { v4 as generateId } from 'uuid';

import { ProfileState, initialState as initialProfileState } from './profile';
import { Actions } from '../actions';

export type ProfilesState = ProfileState[];

const initialState: ProfilesState = [initialProfileState];

export function profiles(state = initialState, action: Actions): ProfilesState {
  switch (action.type) {
    case 'ADD_PROFILE':
      return state.concat({
        ...initialProfileState,
        id: generateId(),
        name: action.data.name,
      });

    case 'REMOVE_PROFILE':
      return state.filter(current => current.id !== action.data.id);

    case 'SET_PROFILE':
      return state.map(current =>
        current.id === action.data.id
          ? { ...current, name: action.data.name }
          : current,
      );

    default:
      return state;
  }
}
