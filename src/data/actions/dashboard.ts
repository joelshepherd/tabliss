import {
  CHANGE_BACKGROUND,
  TOGGLE_FOCUS,
  TOGGLE_SYSTEM,
  TOGGLE_WIDGET,
} from '../constants';

export function toggleFocus() {
  return {
    type: TOGGLE_FOCUS,
  };
}

export function changeBackground(key: string) {
  return {
    type: CHANGE_BACKGROUND,
    payload: key,
  };
}

export function toggleWidget(key: string) {
  return {
    type: TOGGLE_WIDGET,
    payload: key,
  };
}

export function toggleSystem(key: string) {
  return {
    type: TOGGLE_SYSTEM,
    payload: key,
  };
}
