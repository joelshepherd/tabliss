export interface Settings {
  by: By;
  collections: string;
  darken: boolean;
  featured: boolean;
  search: string;
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
