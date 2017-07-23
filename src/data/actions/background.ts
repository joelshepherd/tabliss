import { Plugin } from '../../plugins';

export function changeBackground(background: Plugin) {
  return {
    type: 'CHANGE_BACKGROUND',
    payload: background,
  };
}

export function updateBackgroundSettings(settings: any) {
  return {
    type: 'UPDATE_BACKGROUND_SETTINGS',
    payload: settings,
  };
}
