import { REHYDRATE } from 'redux-persist';
import { Action } from '../actions';

export function booted(state: boolean = false, action: Action): boolean {
  if (action.type === REHYDRATE) {
    return true;
  }

  return state;
}
