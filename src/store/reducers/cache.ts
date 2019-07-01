export function setCache(id: string, cache: object) {
  return {
    type: 'SET_CACHE',
    payload: { id, cache },
  } as const;
}

type CacheActions = ReturnType<typeof setCache>;

export interface CacheState {
  [id: string]: object;
}

const initialState: CacheState = {};

export function cache(state = initialState, action: CacheActions) {
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
