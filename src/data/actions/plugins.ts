import { Settings, State } from '../../plugins';
import { Plugins } from '../interfaces';
import { CHANGE_SETTINGS, PUSH_STATE } from '../constants';

export function changeSettings(key: string, settings: Settings) {
  return {
    type: CHANGE_SETTINGS,
    payload: {
      key,
      settings,
    },
  };
}

export function getSettings(plugins: Plugins, key: string): Settings {
  if (typeof plugins[key] === 'undefined') {
    return {};
  }

  return plugins[key].settings;
}

export function getState(plugins: Plugins, key: string): Settings {
  if (typeof plugins[key] === 'undefined') {
    return {};
  }

  return plugins[key].state;
}

export function pushState(key: string, state: State) {
  return {
    type: PUSH_STATE,
    payload: {
      key,
      state,
    },
  };
}
