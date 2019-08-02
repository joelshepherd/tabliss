import { API } from '../../types';
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

  if (
    body &&
    body.contents &&
    body.contents.quotes &&
    body.contents.quotes[0]
  ) {
    return {
      author: body.contents.quotes[0].author,
      quote: body.contents.quotes[0].quote,
    };
  }

  return {
    author: null,
    quote: null,
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
