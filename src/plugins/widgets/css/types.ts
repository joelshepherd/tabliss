import { API } from '../../interfaces';

type Data = {
  input: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  input: '',
};
