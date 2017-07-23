import * as backgrounds from '../../plugins/Backgrounds';
import * as widgets from '../../plugins/Widgets';

const initialState = [
  ...Object.values(backgrounds as any),
  ...Object.values(widgets as any),
];

export function plugins(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
