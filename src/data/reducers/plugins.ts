import { Action } from '../actions';
import { CHANGE_SETTINGS, RESET_ALL, RESET_SETTINGS } from '../constants';
import { Plugins } from '../interfaces';

const initial = {};

export function plugins(state: Plugins = initial, action: Action): Plugins {
  switch (action.type) {
    case CHANGE_SETTINGS:
      if (typeof state[action.payload.key] === 'undefined') {
        state[action.payload.key] = {
          settings: {},
          state: null,
        };
      }

      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          settings: {
            ...state[action.payload.key].settings,
            ...action.payload.settings
          },
        }
      };

    case RESET_ALL:
    case RESET_SETTINGS:
      return initial;

    default:
      return state;
  }
}
