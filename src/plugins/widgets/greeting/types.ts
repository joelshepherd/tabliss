import { API } from '../../types';

export type Data = {
  name: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  name: '',
};
