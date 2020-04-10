import { Gif, defaultData } from './types';
import { API } from '../../types';

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

type Config = {
  tag?: string;
  nsfw?: boolean;
};

export async function getGif(
  { tag, nsfw }: Config,
  loader: API['loader'],
): Promise<Gif> {
  var tagArray = tag?.split(',') ?? [defaultData.tag];
  var randomTag = tagArray[Math.floor(Math.random() * tagArray.length)];

  const request = new Request(
    'https://api.giphy.com/v1/gifs/random' +
      `?api_key=${GIPHY_API_KEY}` +
      '&rating=' +
      (nsfw ? 'r' : 'g') +
      (randomTag ? `&tag=${randomTag}` : ''),
  );

  loader.push();
  const res = await (await fetch(request)).json();
  const data = await (await fetch(res.data.image_original_url)).blob();
  loader.pop();

  return {
    data,
    link: res.data.url,
  };
}
