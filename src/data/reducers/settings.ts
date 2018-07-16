import { Action } from '../actions';
import {
  CHANGE_LOCALE,
  CHANGE_TIMEZONE,
  RESET_DASHBOARD,
} from '../constants';
import { Settings } from '../interfaces';

const initialState: Settings = {};

export function settings(state: Settings = initialState, action: Action): Settings {
  // Quick dirty migration, until I implement them officially
  if (state.locale === 'zh') {
    state = {
      ...state,
      locale: 'zh-CN',
    };
  }

  switch (action.type) {
    case RESET_DASHBOARD:
      return initialState;

    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };

    case CHANGE_TIMEZONE:
      return {
        ...state,
        timezone: action.payload,
      };

    default:
      return state;
  }
}
