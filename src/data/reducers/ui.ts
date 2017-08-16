import { Action } from '../actions';
import { TOGGLE_SETTINGS } from '../constants';
import { Ui } from '../interfaces';

const initial: Ui = {
  settings: false,
};

export function ui(state: Ui = initial, action: Action): Ui {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: ! state.settings,
      };

    default:
      return state;
  }
}
