export function pushLoader() {
  return {
    type: 'PUSH_LOADER',
  } as const;
}

export function popLoader() {
  return {
    type: 'POP_LOADER',
  } as const;
}

export function toggleFocus() {
  return {
    type: 'TOGGLE_FOCUS',
  } as const;
}

export function toggleSettings() {
  return {
    type: 'TOGGLE_SETTINGS',
  } as const;
}

type UiActions =
  | ReturnType<typeof pushLoader>
  | ReturnType<typeof popLoader>
  | ReturnType<typeof toggleFocus>
  | ReturnType<typeof toggleSettings>;

export interface UiState {
  focus: boolean;
  loaders: number;
  settings: boolean;
}

const initialState: UiState = {
  focus: false,
  loaders: 0,
  settings: false,
};

export function ui(state = initialState, action: UiActions) {
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
