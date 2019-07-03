import { API } from '../../interfaces';

export type Data = {
  colour?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  colour: '#3498db',
};
