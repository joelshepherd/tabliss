import { Actions } from '../actions';

export interface CacheState {
  [id: string]: object | undefined;
}

const initialState: CacheState = {};

export function cache(state = initialState, action: Actions): CacheState {
  switch (action.type) {
    case 'SET_CACHE':
      return {
        ...state,
        [action.payload.id]: action.payload.cache,
      };

    default:
      return state;
  }
}
