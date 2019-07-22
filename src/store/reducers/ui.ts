import { Actions } from '../actions';

export interface UiState {
  focus: boolean;
  loaders: number;
  settings: boolean;
  storeError?: Error;
}

const initialState: UiState = {
  focus: false,
  loaders: 0,
  settings: false,
};

export function ui(state = initialState, action: Actions): UiState {
  switch (action.type) {
    case 'PUSH_LOADER':
      return {
        ...state,
        loaders: state.loaders + 1,
      };

    case 'POP_LOADER':
      return {
        ...state,
        loaders: state.loaders - 1,
      };

    case 'SET_STORE_ERROR':
      return {
        ...state,
        storeError: action.data.storeError,
      };

    case 'TOGGLE_FOCUS':
      return {
        ...state,
        focus: !state.focus,
      };

    case 'TOGGLE_SETTINGS':
      return {
        ...state,
        settings: !state.settings,
      };

    default:
      return state;
  }
}
