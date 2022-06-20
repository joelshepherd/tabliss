import { API } from '../../types';

type Data = { name: string; date: string };

export type Props = API<Data>;

export const defaultData: Data = {
  name: 'Rock hard packs coming up in a year',
  date: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split('T')[0],
};
