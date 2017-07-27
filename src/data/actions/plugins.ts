import { Settings } from '../../plugins';
import { Plugins } from '../interfaces';
import { CHANGE_SETTINGS, RESET_SETTINGS } from '../constants';

export function changeSettings(key: string, settings: Settings) {
  return {
    type: CHANGE_SETTINGS,
    payload: {
      key,
      settings,
    },
  };
}

export function resetSettings() {
  return {
    type: RESET_SETTINGS,
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
