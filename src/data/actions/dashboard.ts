import {
  CHANGE_BACKGROUND,
  RESET_DASHBOARD,
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

export function resetDashboard() {
  return {
    type: RESET_DASHBOARD,
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
