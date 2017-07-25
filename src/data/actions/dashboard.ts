export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';
export const TOGGLE_WIDGET = 'TOGGLE_WIDGET';

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
