import { Gif } from './types';

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export async function getGif(tag?: string, nsfw?: boolean): Promise<Gif> {
  const request = new Request(
    'https://api.giphy.com/v1/gifs/random' +
      `?api_key=${GIPHY_API_KEY}` +
      '&rating=' +
      (nsfw ? 'r' : 'g') +
      (tag ? `&tag=${tag}` : ''),
  );

  const res = await (await fetch(request)).json();
  const data = await (await fetch(res.data.image_original_url)).blob();

  return {
    data,
    link: res.data.url,
  };
}
