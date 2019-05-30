import {
  POP_PENDING,
  PUSH_PENDING,
  TOGGLE_FOCUS,
  TOGGLE_SETTINGS,
} from '../constants';

export function toggleFocus() {
  return {
    type: TOGGLE_FOCUS,
  };
}

export function popPending() {
  return {
    type: POP_PENDING,
  };
}

export function pushPending() {
  return {
    type: PUSH_PENDING,
  };
}

export function toggleSettings() {
  return {
    type: TOGGLE_SETTINGS,
  };
}
