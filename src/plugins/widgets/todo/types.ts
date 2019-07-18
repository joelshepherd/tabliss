import { API } from '../../types';
import { State } from './reducer';

export type Data = {
  items: State;
  show: number;
  textAlign: 'inherit' | 'left';
};

export type Props = API<Data>;

export const defaultData: Data = {
  items: [],
  show: 3,
  textAlign: 'left',
};
