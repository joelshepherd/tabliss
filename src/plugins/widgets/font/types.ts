import { API } from '../../interfaces';

type Data = {
  colour: string;
  family: string;
  size: number;
  weight: number;
};

export type Props = API<Data>;

export const defaultData: Data = {
  colour: '#ffffff',
  family: '',
  size: 28,
  weight: 400,
};
