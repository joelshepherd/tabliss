import { officialCollection, UNSPLASH_API_KEY } from './constants';
import { By, Image, Settings } from './interfaces';

export const getImage = async function(
  settings: Settings,
  pushCallback: Function,
  popCallback: Function,
): Promise<Image> {
  // Setup
  const { by, collections, featured, search } = settings;
  const headers = new Headers();
  headers.append('Authorization', `Client-ID ${UNSPLASH_API_KEY}`);

  // Build search url
  let url = 'https://api.unsplash.com/photos/random?';
  switch (by) {
    case By.COLLECTIONS:
      url += `collections=${collections}`;
      break;

    case By.SEARCH:
      url +=
        'orientation=landscape' +
        (featured ? '&featured=true' : '') +
        (search ? `&query=${search}` : '');
      break;

    default:
      url += `collections=${officialCollection}`;
  }

  // Fetch from API
  pushCallback();
  const res = await (await fetch(url, { headers })).json();
  const data = await (await fetch(res.urls.raw + '?q=85&w=1920')).blob();
  popCallback();

  return {
    data,
    image_link: res.links.html,
    location_title: res.location ? res.location.title : null,
    user_name: res.user.name,
    user_link: res.user.links.html,
  };
};
