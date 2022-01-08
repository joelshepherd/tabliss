import { Reducer, ReducerState, useEffect, useReducer } from "react";

export function useSavedReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  save: (state: ReducerState<R>) => void,
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    save(state);
  }, [state]);

  return dispatch;
}
