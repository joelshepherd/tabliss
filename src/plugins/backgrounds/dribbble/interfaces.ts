export interface Shot {
  id: number;
  title: string;
  html_url: string;
  images: {
    normal: string;
    hidpi?: string;
  };
  user: {
    name: string;
  };
}
