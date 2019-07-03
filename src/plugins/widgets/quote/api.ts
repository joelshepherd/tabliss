import { API } from '../../interfaces';
import get from 'lodash-es/get';
import { Quote } from './types';

// Get developer excuse
async function getDeveloperExcuse(): Promise<Quote> {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/developer-excuses`);
    const body = await res.json();

    return {
      date: new Date().getDate(),
      quote: body.data,
    };
  } catch (err) {
    return {
      date: 0,
      quote: 'Unable to get a new developer excuse.',
    };
  }
}

// Get quote of the day
async function getQuoteOfTheDay(category?: string): Promise<Quote> {
  const res = await fetch(
    'https://quotes.rest/qod.json' + (category ? `?category=${category}` : ''),
  );
  const body = await res.json();

  if (res.status === 429) {
    return {
      author: body.error.message.split('.')[1] + '.',
      date: 0,
      quote: 'Too many requests this hour.',
    };
  }

  return {
    author: get(body, 'contents.quotes[0].author'),
    date: new Date().getDate(),
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

  return quote;
}
