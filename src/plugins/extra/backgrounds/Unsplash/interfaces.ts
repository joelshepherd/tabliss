export interface Settings {
  curated: boolean;
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
