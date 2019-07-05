import { API } from '../../interfaces';
import { State } from './reducer';

export type Data = {
  show: number;
  textAlign: 'inherit' | 'left';
};

type Cache = State;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  show: 3,
  textAlign: 'left',
};

export const defaultCache: Cache = [];
