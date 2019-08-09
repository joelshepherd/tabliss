import { API } from '../../types';

type Data = {
  time: number;
  title?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  time: Date.now(),
};
