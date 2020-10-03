import { API } from '../../types';
import { officialCollection, UNSPLASH_API_KEY } from './constants';
import { Data, Image } from './types';

type Config = Pick<Data, 'by' | 'collections' | 'featured' | 'search'>;

async function fetchImageFromImgIX(url: string) {
  const MAX_IMAGE_WIDTH_SUPPORTED = 8192;
  const OUTPUT_QUALITY = 85; // range [0-100]
  const OUTPUT_WIDTH = window.screen.availWidth > MAX_IMAGE_WIDTH_SUPPORTED ?
    MAX_IMAGE_WIDTH_SUPPORTED : window.screen.availWidth;

  let params = new URLSearchParams({
    q: String(OUTPUT_QUALITY),
    w: String(OUTPUT_WIDTH)
  });

  return await (await fetch(url + params)).blob();
}

export async function getImage(
  settings: Config,
  loader: API['loader'],
): Promise<Image> {
  // Setup
  const { by, collections, featured, search } = settings;
  const headers = new Headers();
  headers.append('Authorization', `Client-ID ${UNSPLASH_API_KEY}`);

  // Build search url
  let url = 'https://api.unsplash.com/photos/random?';
  switch (by) {
    case 'collections':
      url += `collections=${collections}`;
      break;

    case 'search':
      url +=
        'orientation=landscape' +
        (featured ? '&featured=true' : '') +
        (search ? `&query=${search}` : '');
      break;

    default:
      url += `collections=${officialCollection}`;
  }

  // Fetch from API
  loader.push();
  const res = await (await fetch(url, { headers })).json();
  const data = await fetchImageFromImgIX(res.urls.raw);
  loader.pop();

  return {
    data,
    image_link: res.links.html,
    location_title: res.location ? res.location.title : null,
    user_name: res.user.name,
    user_link: res.user.links.html,
  };
}
