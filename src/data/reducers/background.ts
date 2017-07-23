import { Colour } from '../../plugins/Backgrounds';

const initialState = {
  component: Colour,
  settings: null,
};

export function background(state = initialState, action: any) {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      return {
        ...state,
        component: action.payload,
        settings: null,
      };

    case 'UPDATE_BACKGROUND_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };

    default:
      return state;
  }
}
