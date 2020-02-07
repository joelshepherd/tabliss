import { RotatingCache } from '../../../hooks';
import { API } from '../../types';

type By = 'official' | 'collections' | 'search';

export interface Data {
  by: By;
  collections: string;
  featured: boolean;
  search: string;
  timeout: number;
  size?: string;
  id?: string;
}

export interface Image {
  data: Blob;
  id: string;
  image_link: string;
  location_title?: string;
  user_name: string;
  user_link: string;
}

export interface cachedData {
  currentImage: Image;
  previous_images: Array<Image>;
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
