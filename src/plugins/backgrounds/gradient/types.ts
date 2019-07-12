import { API } from '../../types';

export type Data = {
  angle: number;
  from: string;
  to: string;
  type: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  angle: 0,
  from: '#3498db',
  to: '#9b59b6',
  type: 'linear-gradient',
};
