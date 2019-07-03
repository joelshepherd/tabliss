import { API } from '../../interfaces';

export type Data = {
  images: File[];
};

export type Props = API<Data>;

export const defaultData: Data = {
  images: [],
};
