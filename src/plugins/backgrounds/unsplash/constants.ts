import { By } from './interfaces';

export const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
export const UNSPLASH_UTM =
  '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

export const defaultProps = {
  blur: 0,
  darken: 10,
  by: By.OFFICIAL,
  collections: '',
  featured: false,
  search: '',
  timeout: 0,
};

export const officialCollection = 1053828;
