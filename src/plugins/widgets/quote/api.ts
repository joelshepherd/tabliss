import { API } from '../../types';
import get from 'lodash-es/get';
import { Quote } from './types';

// Get developer excuse
async function getDeveloperExcuse() {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/developer-excuses`);
    const body = await res.json();

    return {
      quote: body.data,
    };
  } catch (err) {
    return {
      quote: 'Unable to get a new developer excuse.',
    };
  }
}

// Get quote of the day
async function getQuoteOfTheDay(category?: string) {
  const res = await fetch(
    'https://quotes.rest/qod.json' + (category ? `?category=${category}` : ''),
  );
  const body = await res.json();

  if (res.status === 429) {
    return {
      author: body.error.message.split('.')[1] + '.',
      quote: 'Too many requests this hour.',
    };
  }

  return {
    author: get(body, 'contents.quotes[0].author'),
    quote: get(body, 'contents.quotes[0].quote'),
  };
}

export async function getQuote(
  loader: API['loader'],
  category?: string,
): Promise<Quote> {
  loader.push();

  const quote =
    category === 'developerexcuses'
      ? await getDeveloperExcuse()
      : await getQuoteOfTheDay(category);

  loader.pop();

  return {
    ...quote,
    timestamp: Date.now(),
  };
}
