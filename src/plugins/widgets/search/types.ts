import { API } from '../../types';

type Data = {
  searchEngine?: string;
  placeholder?: string;
  suggestionsEngine?: string;
  suggestionsQuantity?: number;
};

export type Props = API<Data>;

export const defaultData: Data = {
  searchEngine: 'google',
  placeholder: '',
  suggestionsEngine: '',
  suggestionsQuantity: 4,
};
