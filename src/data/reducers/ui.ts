import { Action } from '../actions';
import { TOGGLE_FOCUS, TOGGLE_SETTINGS } from '../constants';
import { Ui } from '../interfaces';

const initialState: Ui = {
  focus: false,
  settings: false,
};

export function ui(state: Ui = initialState, action: Action): Ui {
  switch (action.type) {
    case TOGGLE_FOCUS:
      return { ...state, focus: ! state.focus };

    case TOGGLE_SETTINGS:
      return { ...state, settings: ! state.settings };

    default:
      return state;
  }
}
