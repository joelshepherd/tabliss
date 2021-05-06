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
  image_id: string;
  image_link: string;
  download_link: string;
  download_string: string;
  location_title?: string;
  user_name: string;
  user_link: string;
  liked_by_client: boolean;
  liked_string: string;
  liked_color: string;
}

type Cache = RotatingCache<Image>;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  by: 'official',
  collections: '',
  featured: false,
  search: '',
  timeout: 900,
};
