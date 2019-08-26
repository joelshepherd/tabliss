import { API } from '../../types';
import { Palette } from './types';

// Get random color palette
async function getRandomPalette() {
  try {
    const data = {
      model: 'default',
    };
    const res = await fetch(`${process.env.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const { result } = await res.json();
    console.log(result);
    return {
      palette: result,
    };
  } catch (err) {
    console.log(err);
    return {
      palette: err,
    };
  }
}

export async function getRandomColorPalette(
  loader: API['loader'],
): Promise<Palette> {
  loader.push();

  const palette = await getRandomPalette();

  loader.pop();

  return {
    ...palette,
    timestamp: Date.now(),
  };
}
