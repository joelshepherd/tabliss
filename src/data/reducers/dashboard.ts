import { Action } from '../actions';
import {
  ADD_WIDGET,
  CHANGE_BACKGROUND,
  RESET_DASHBOARD,
  REMOVE_WIDGET,
  REORDER_WIDGET,
} from '../constants';
import { Dashboard } from '../interfaces';

const initialState = {
  background: 'extra/backgrounds/unsplash',
  widgets: [
    'core/widgets/time',
    'core/widgets/greeting',
    'core/widgets/font',
  ],
};

export function dashboard(state: Dashboard = initialState, action: Action): Dashboard {
    // Quick dirty migration, until I implement them officially
  if (process.env.BUILD_TARGET === 'chrome') {
    const widgetToRemove = 'widgets/js';

    if (state.widgets.includes(widgetToRemove)) {
      state = {
        ...state,
        widgets: state.widgets.filter(widget => widget !== widgetToRemove),
      };
    }
  }

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

    case REORDER_WIDGET:
      const widgets = [...state.widgets];
      widgets.splice(
        action.payload.to, 0,
        widgets.splice(widgets.indexOf(action.payload.key), 1)[0]
      );

      return {
        ...state,
        widgets,
      };

    default:
      return state;
  }
}
