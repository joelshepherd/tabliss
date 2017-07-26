export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';
export const RESET_DASHBOARD = 'RESET_DASHBOARD';
export const TOGGLE_FOCUS = 'TOGGLE_FOCUS';
export const TOGGLE_WIDGET = 'TOGGLE_WIDGET';

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
