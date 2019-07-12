import { API } from '../../types';
import { RotatingCache } from '../../../utils/useCache';

export enum By {
  OFFICIAL = 'official',
  COLLECTIONS = 'collections',
  SEARCH = 'search',
}

export interface Data {
  blur: number;
  darken: number;
  by: By;
  collections: string;
  featured: boolean;
  search: string;
  timeout: number;
}

export interface Image {
  data: Blob;
  image_link: string;
  location_title?: string;
  user_name: string;
  user_link: string;
}

type Cache = RotatingCache<Image>;

export type Props = API<Data, Cache>;
