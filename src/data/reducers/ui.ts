import { Action } from '../actions';
import { POP_PENDING, PUSH_PENDING, TOGGLE_FOCUS, TOGGLE_SETTINGS } from '../constants';
import { Ui } from '../interfaces';

const initialState: Ui = {
  focus: false,
  pending: 0,
  settings: false,
};

export function ui(state: Ui = initialState, action: Action): Ui {
  switch (action.type) {
    case POP_PENDING:
      return { ...state, pending: state.pending - 1 };

    case PUSH_PENDING:
      return { ...state, pending: state.pending + 1 };

    case TOGGLE_FOCUS:
      return { ...state, focus: ! state.focus };

    case TOGGLE_SETTINGS:
      return { ...state, settings: ! state.settings };

    default:
      return state;
  }
}
