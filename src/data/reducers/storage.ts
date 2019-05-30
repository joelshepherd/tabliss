import { Action } from '../actions';
import {
  RESET_DASHBOARD,
  SET_LOCAL_STORAGE,
  SET_SETTINGS_STORAGE,
  UPDATE_LOCAL_STORAGE,
  UPDATE_SETTINGS_STORAGE,
} from '../constants';
import { Storage } from '../interfaces';

const initialState: Storage = {};

export function storage(
  state: Storage = initialState,
  action: Action,
): Storage {
  switch (action.type) {
    case RESET_DASHBOARD:
      return initialState;

    case SET_LOCAL_STORAGE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          local: action.payload.data,
        },
      };

    case UPDATE_LOCAL_STORAGE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          local: {
            ...(state[action.payload.key] || {}).local,
            ...action.payload.data,
          },
        },
      };

    case SET_SETTINGS_STORAGE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          settings: action.payload.data,
        },
      };

    case UPDATE_SETTINGS_STORAGE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          settings: {
            ...(state[action.payload.key] || {}).settings,
            ...action.payload.data,
          },
        },
      };

    default:
      return state;
  }
}
