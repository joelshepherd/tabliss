import { Dashboard } from '../state';
import { Action, CHANGE_BACKGROUND, TOGGLE_WIDGET } from '../actions';

const initial = {
  background: 'core/backgrounds/colour',
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
