import { Actions } from '../actions';

export type SettingsState = {
  locale?: string;
};

const initialState: SettingsState = {};

export function settings(state = initialState, action: Actions): SettingsState {
  switch (action.type) {
    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.data.locale,
      };

    default:
      return state;
  }
}
