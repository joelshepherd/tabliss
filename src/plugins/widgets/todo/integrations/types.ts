// import { ComponentType } from 'react';
// import { Action } from '../actions';

// type Integration = {
//   hook: (data: unknown, setData: (data: unknown) => void) => I;
//   settingsComponent: ComponentType;
// };

// type I = {
//   items: any[];
//   add(contents: string): void;
//   update(id: string, contents: string): void;
//   toggle(id: string): void;
//   remove(id: string): void;
// };

// type Hook = (data: unknown, setData: (data: unknown) => void) => I;

// type DispatchWrapper<D = React.Dispatch<Action>> = (dispatch: D) => D;

// const wrapper: DispatchWrapper = dispatch => {
//   //
//   init();

//   return action => {
//     dispatch(action);
//     listener(dispatch, action);
//   };
// };

// type Listener = (dispatch: React.Dispatch<Action>, action: Action) => void;

// class IClass {
//   constructor(private dispatch: React.Dispatch<Action>) {}

//   add(contents: string) {
//     this.dispatch({ type: 'ADD_TODO', data: { contents } });
//   }
// }

export default {};
