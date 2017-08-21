import { Action } from '../actions';
import {
  ADD_WIDGET,
  CHANGE_BACKGROUND,
  RESET_DASHBOARD,
  REMOVE_WIDGET,
} from '../constants';
import { Dashboard } from '../interfaces';

const initialState = {
  background: 'core/backgrounds/image',
  widgets: [
    'core/widgets/time',
    'core/widgets/greeting',
  ],
};

export function dashboard(state: Dashboard = initialState, action: Action): Dashboard {
  switch (action.type) {
    case CHANGE_BACKGROUND:
      return {
        ...state,
        background: action.payload,
      };

    case RESET_DASHBOARD:
      return initialState;

    case ADD_WIDGET:
      return {
        ...state,
        widgets: [...state.widgets, action.payload],
      };

    case REMOVE_WIDGET:
      return {
        ...state,
        widgets: state.widgets.filter(key => key !== action.payload),
      };

    default:
      return state;
  }
}
