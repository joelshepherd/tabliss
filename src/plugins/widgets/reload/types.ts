import { API } from '../../interfaces';

type Data = {
  timeout: number;
};

export type Props = API<Data>;

export const defaultData: Data = {
  timeout: 15,
};
