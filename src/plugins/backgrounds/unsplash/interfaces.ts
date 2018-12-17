export interface Settings {
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

export enum By {
  OFFICIAL = 'official',
  COLLECTIONS = 'collections',
  SEARCH = 'search',
}
