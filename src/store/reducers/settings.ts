import { Actions } from '../actions';

export type SettingsState = {
  locale?: string;
  timeZone?: string;
};

const initialState: SettingsState = {};

export function settings(state = initialState, action: Actions): SettingsState {
  switch (action.type) {
    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.data.locale,
      };

    case 'SET_TIME_ZONE':
      return {
        ...state,
        timeZone: action.data.timeZone,
      };

    default:
      return state;
  }
}
