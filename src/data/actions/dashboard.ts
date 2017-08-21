import { ADD_WIDGET, CHANGE_BACKGROUND, REMOVE_WIDGET } from '../constants';

export function changeBackground(key: string) {
  return {
    type: CHANGE_BACKGROUND,
    payload: key,
  };
}

export function addWidget(key: string) {
  return {
    type: ADD_WIDGET,
    payload: key,
  };
}

export function removeWidget(key: string) {
  return {
    type: REMOVE_WIDGET,
    payload: key,
  };
}
