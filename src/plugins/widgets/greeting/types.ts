import { API } from '../../interfaces';

export type Data = {
  name: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  name: '',
};
