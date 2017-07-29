import { Action } from '../actions';
import { CHANGE_BACKGROUND, RESET_ALL, RESET_DASHBOARD, TOGGLE_FOCUS, TOGGLE_WIDGET } from '../constants';
import { Dashboard } from '../interfaces';

const initial = {
  background: 'core/backgrounds/image',
  focus: false,
  widgets: [
    'core/widgets/time',
    'core/widgets/greeting',
  ],
};

export function dashboard(state: Dashboard = initial, action: Action): Dashboard {
  switch (action.type) {
    case CHANGE_BACKGROUND:
      return {
        ...state,
        background: action.payload,
      };

    case RESET_ALL:
    case RESET_DASHBOARD:
      return initial;

    case TOGGLE_FOCUS:
      return {
        ...state,
        focus: ! state.focus,
      };

    case TOGGLE_WIDGET:
      return {
        ...state,
        widgets: state.widgets.includes(action.payload)
          ? state.widgets.filter(key => key !== action.payload)
          : [...state.widgets, action.payload],
      };

    default:
      return state;
  }
}
