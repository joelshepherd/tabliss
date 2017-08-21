import { Settings, Local } from '../../plugins';
import {
  SET_LOCAL_STORAGE,
  SET_SETTINGS_STORAGE,
  UPDATE_LOCAL_STORAGE,
  UPDATE_SETTINGS_STORAGE,
} from '../constants';

export function setLocal(key: string, data: Local) {
  return {
    type: SET_LOCAL_STORAGE,
    payload: { key, data },
  };
}

export function updateLocal(key: string, data: Local) {
  return {
    type: UPDATE_LOCAL_STORAGE,
    payload: { key, data },
  };
}

export function setSettings(key: string, data: Settings) {
  return {
    type: SET_SETTINGS_STORAGE,
    payload: { key, data },
  };
}

export function updateSettings(key: string, data: Settings) {
  return {
    type: UPDATE_SETTINGS_STORAGE,
    payload: { key, data },
  };
}
