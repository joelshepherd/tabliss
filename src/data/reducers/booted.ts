import { REHYDRATE } from 'redux-persist/constants';
import { Action } from '../actions';

export function booted(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case REHYDRATE:
      return true;

    default:
      return state;
  }
}
