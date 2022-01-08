import { Actions } from "../actions";
import { CacheState } from "./types";

const initialState: CacheState = {};

export function cache(state = initialState, action: Actions): CacheState {
  switch (action.type) {
    case "REMOVE_WIDGET":
      return {
        ...state,
        [action.data.id]: undefined,
      };

    case "RESET_STORE":
      return initialState;

    case "SET_BACKGROUND":
      return action.data.from
        ? {
            ...state,
            [action.data.from]: undefined,
          }
        : state;

    case "SET_CACHE":
      return {
        ...state,
        [action.payload.id]: action.payload.cache,
      };

    default:
      return state;
  }
}
