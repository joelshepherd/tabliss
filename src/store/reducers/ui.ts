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
  | ReturnType<typeof toggleFocus>
  | ReturnType<typeof toggleSettings>;

export interface UiState {
  focus: boolean;
  settings: boolean;
}

const initialState: UiState = {
  focus: false,
  settings: false,
};

export function ui(state = initialState, action: UiActions) {
  switch (action.type) {
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
