import { Action } from '../actions';
import { CHANGE_SETTINGS, PUSH_STATE, RESET } from '../constants';
import { Plugins } from '../interfaces';

const initial = {};

export function plugins(state: Plugins = initial, action: Action): Plugins {
  switch (action.type) {
    case CHANGE_SETTINGS:
      if (typeof state[action.payload.key] === 'undefined') {
        state[action.payload.key] = {
          settings: {},
          state: {},
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

    case PUSH_STATE:
      if (typeof state[action.payload.key] === 'undefined') {
        state[action.payload.key] = {
          settings: {},
          state: {},
        };
      }

      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          state: action.payload.state,
        }
      };

    case RESET:
      return initial;

    default:
      return state;
  }
}
