import { API } from '../../types';

type Data = {
  input: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  input: '',
};
