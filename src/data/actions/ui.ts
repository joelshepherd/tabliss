import { TOGGLE_FOCUS, TOGGLE_SETTINGS } from '../constants';

export function toggleFocus() {
  return {
    type: TOGGLE_FOCUS,
  };
}

export function toggleSettings() {
  return {
    type: TOGGLE_SETTINGS,
  };
}
