import { API } from '../../types';

type Data = {
  searchEngine: string;
  suggestionsEngine?: string;
  suggestionsQuantity: number;
};

export type Props = API<Data>;

export const defaultData: Data = {
  searchEngine: 'google',
  suggestionsQuantity: 4,
};
