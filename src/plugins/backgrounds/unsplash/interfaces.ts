export interface Settings {
  blur: boolean;
  by: By;
  collections: string;
  darken: boolean;
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
  download: string;
}

export enum By {
  OFFICIAL = 'official',
  COLLECTIONS = 'collections',
  SEARCH = 'search'
}
