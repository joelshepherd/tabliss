import { Settings } from '../../plugins';

export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export const RESET_SETTINGS = 'RESET_SETTINGS';

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

export function getSettings(plugins: any, key: string): Settings {
  if (typeof plugins[key] === 'undefined') {
    return {};
  }

  return plugins[key].settings;
}

export function getState(plugins: any, key: string): Settings {
  if (typeof plugins[key] === 'undefined') {
    return {};
  }

  return plugins[key].state;
}
