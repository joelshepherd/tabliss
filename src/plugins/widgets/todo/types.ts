import { API } from '../../types';
import { State } from './reducer';
import { Action } from './actions';

export type Dispatch = (action: Action) => void;

export type DataIntegration = {
  provider?: string;
  data?: any;
};

export type Data = {
  integration: DataIntegration;
  items: State;
  show: number;
};

export type Props = API<Data>;

export const defaultData: Data = {
  integration: {},
  items: [],
  show: 3,
};
