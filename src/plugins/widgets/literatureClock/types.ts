import { API } from '../../types';

export type Quote = {
  timeCode?: string;
  quote_first?: string;
  quote_time_case?: string;
  quote_last?: string;
  title: string;
  author?: string;
};

export type Data = {
  showBookAndAuthor: boolean;
  centerText: boolean;
};

export type Cache = Quote;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  showBookAndAuthor: true,
  centerText: false,
};
