import { Actions } from '../actions';

export type SettingsState = {
  locale?: string;
  profileId: string;
  timeZone?: string;
};

const initialState: SettingsState = {
  profileId: '00000000-0000-0000-0000-000000000000',
};

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
