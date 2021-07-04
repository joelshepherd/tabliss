import { API } from '../../types';

export type Quote = {
  author?: string;
  quote: string;
  timestamp: number;
};

type Data = {
  url: string;
};

type Cache = Quote;

export type Props = API<Data, Cache>;

export const defaultData: Data = { url: '' };
