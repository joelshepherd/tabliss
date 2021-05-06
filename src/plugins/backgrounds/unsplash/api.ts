import { API } from '../../types';
import { officialCollection, UNSPLASH_API_KEY } from './constants';
import {
  LIKED_OFF_STRING,
  LIKED_OFF_COLOR,
  LIKED_ON_STRING,
  LIKED_ON_COLOR,
  DOWNLOAD_STRING
} from './constants';
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

  var text: string;
  var color: string;

  if (res.liked_by_user) {
    text = LIKED_ON_STRING;
    color = LIKED_ON_COLOR;
  } else {
    text = LIKED_OFF_STRING;
    color = LIKED_OFF_COLOR;
  }

  return {
    data,
    image_id: res.id,
    image_link: res.links.html,
    download_link: res.urls.raw,
    download_string: DOWNLOAD_STRING,
    location_title: res.location ? res.location.title : null,
    user_name: res.user.name,
    user_link: res.user.links.html,
    liked_by_client: res.liked_by_user,
    liked_string: text,
    liked_color: color,
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
  const width = calculateWidth(window.innerWidth);

  const params = new URLSearchParams({
    q: String(quality),
    w: String(width),
  });

  return await (await fetch(url + params)).blob();
}

/**
 * Calculate width to fetch image, tuned for Unsplash cache performance.
 */
export function calculateWidth(screenWidth: number = 1920): number {
  // Consider a minimum resolution too
  screenWidth = Math.max(screenWidth, 1920); // Lower limit at 1920
  screenWidth = Math.min(screenWidth, 3840); // Upper limit at 4K
  screenWidth = Math.ceil(screenWidth / 240) * 240; // Snap up to nearest 240px for improved caching
  return screenWidth;
}

export const MouseEnterDownload = (image: Image) => () => {
  image.download_string = DOWNLOAD_STRING;
};

export const MouseLeaveDownload = (image: Image) => () => {
  image.download_string = DOWNLOAD_STRING;
};

export const MouseEnterLike = (image: Image) => () => {
  if (image.liked_by_client) {
    image.liked_color = LIKED_OFF_COLOR;
  } else {
    image.liked_color = LIKED_ON_COLOR;
  }
};

export const MouseLeaveLike = (image: Image) => () => {
  if (image.liked_by_client) {
    image.liked_color = LIKED_ON_COLOR;
  } else {
    image.liked_color = LIKED_OFF_COLOR;
  }
};

export const ToggleLike = (image: Image) => () => {
  if (image.liked_by_client) {
    Unlike(image);
  } else {
    Like(image);
  }
  return;
};

function Like(image: Image): boolean {
  var request = new XMLHttpRequest();
  request.open('POST', `/photos/:${image.image_id}/like`);
  image.liked_string = LIKED_ON_STRING;
  image.liked_color = LIKED_ON_COLOR;
  return image.liked_by_client == true;
}

function Unlike(image: Image): boolean {
  var request = new XMLHttpRequest();
  request.open('DELETE', `/photos/:${image.image_id}/like`, true);
  image.liked_string = LIKED_OFF_STRING;
  image.liked_color = LIKED_OFF_COLOR;
  return image.liked_by_client == false;
}
