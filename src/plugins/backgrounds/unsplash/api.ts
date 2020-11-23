import { API } from '../../types';
import { officialCollection, UNSPLASH_API_KEY } from './constants';
import { Data, Image } from './types';

type Config = Pick<Data, 'by' | 'collections' | 'featured' | 'search'>;

export async function getImage(
  config: Config,
  loader: API['loader'],
): Promise<Image> {
  // Fetch random image
  loader.push();
  const res = await fetchImageMeta(config);
  const data = await fetchImageData(res.urls.raw);
  loader.pop();

  return {
    data,
    image_link: res.links.html,
    location_title: res.location ? res.location.title : null,
    user_name: res.user.name,
    user_link: res.user.links.html,
  };
}

async function fetchImageMeta({ by, collections, featured, search }: Config) {
  const url = 'https://api.unsplash.com/photos/random';
  const params = new URLSearchParams();
  const headers = new Headers({
    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
  });

  switch (by) {
    case 'collections':
      params.set('collections', collections);
      break;

    case 'search':
      params.set('orientation', 'landscape');
      if (featured) params.set('featured', 'true');
      if (search) params.set('query', search);
      break;

    default:
      params.set('collections', String(officialCollection));
  }

  const res = await fetch(`${url}?${params}`, { headers });
  return res.json();
}

async function fetchImageData(url: string) {
  const quality = 85; // range [0-100]
  const screenWidth = window.screen.availWidth || 1920;
  const width = Math.min(screenWidth, 3840);

  const params = new URLSearchParams({
    q: String(quality),
    w: String(width),
  });

  return await (await fetch(url + params)).blob();
}
