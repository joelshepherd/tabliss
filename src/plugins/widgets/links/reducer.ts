import { Link } from './types';

type State = Link[];

type Action =
  | { type: 'ADD_LINK' }
  | { type: 'UPDATE_LINK'; data: { index: number; link: Link } }
  | { type: 'REMOVE_LINK'; data: { index: number } }
  | { type: 'REORDER_LINK'; data: { index: number; to: number } };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_LINK':
      return state.concat({ url: 'https://' });

    case 'REMOVE_LINK':
      return state.filter((_, index) => index !== action.data.index);

    case 'UPDATE_LINK':
      return state.map((link, index) =>
        index === action.data.index ? action.data.link : link,
      );

    case 'REORDER_LINK':
      const links = [...state];
      links.splice(action.data.to, 0, links.splice(action.data.index, 1)[0]);
      return links;

    default:
      throw new Error('Unknown action');
  }
}
