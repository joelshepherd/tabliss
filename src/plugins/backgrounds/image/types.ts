import { API } from '../../types';

export type Data = {};

export type Cache = {
  images: File[];
};

export type Props = API<Data, Cache>;

export const defaultCache: Cache = {
  images: [],
};
