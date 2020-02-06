import { RotatingCache } from '../../../hooks';
import { API } from '../../types';

type By = 'official' | 'collections' | 'search';

export interface Data {
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

export interface cachedData {
  currentImage: Image;
  previous_images?: Array<String>;
}

type Cache = RotatingCache<cachedData>;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  by: 'official',
  collections: '',
  featured: false,
  search: '',
  timeout: 0,
};
