import * as available from '../../plugins/Widgets';

const initialState = Object.values(available).map(widget => {
  return {
    component: widget,
    settings: null,
  };
});

export function widgets(state = initialState, action: any) {
  switch (action.type) {
    case 'CHANGE_SETTINGS':
      return state.map(widget => {
        if (widget.component === action.payload.component) {
          widget = {
            component: widget.component,
            settings: {
              ...widget.settings,
              ...action.payload.settings,
            },
          };
        }

        return widget;
      });

    default:
      return state;
  }
}
