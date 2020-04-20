import Parser from 'rss-parser';

import { API } from '../../types';
import { Quote } from './types';

async function getQuoteFromFeed(url: string) {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    if (!(feed && feed.items && feed.items[0])) {
      return {
        quote: 'Unable to parse RSS feed',
      };
    }
    const item = feed.items[0];
    const singleInfo = item.title || item.content;
    if (item.title && item.content) {
      return {
        author: item.title,
        quote: item.content,
      };
    } else if (singleInfo) {
      return {
        quote: singleInfo,
      }
    }
    return {
      quote: 'Empty RSS feed item',
    };
  } catch (err) {
    return {
      quote: 'Unable to get RSS feed',
    };
  }
}

export async function getQuote(
  loader: API['loader'],
  url: string,
): Promise<Quote> {
  loader.push();

  const data = await getQuoteFromFeed(url);

  loader.pop();

  const quote = cleanQuote(data.quote);

  return {
    ...data,
    quote,
    timestamp: Date.now(),
  };
}

function cleanQuote(quote: string) {
  // We remove whitespaces at the beginning and the end of the quote.
  quote = quote.trim();

  // We remove enclosing quotes if they enclose the whole quote
  // Prevents doubled quotion marks
  const enclosingQuotes = new RegExp(/^['"]?(.*)['"]?$/, 'g');
  quote = quote.replace(enclosingQuotes, '$1');

  // We change all straight quotes (' and ") following a non-whitespace character by
  // a closing curvy quote (’).
  const singleStraightQuote = new RegExp(/(\S)'|"/, 'g');
  quote = quote.replace(singleStraightQuote, '$1’');

  // We now change all remaining straight quotes (all following a whitespace
  // character) by an opening curvy quote (‘).
  const openingStraightQuote = new RegExp(/(^|\s)'|"/, 'g');
  quote = quote.replace(openingStraightQuote, '$1‘');

  // We replace all series of three dots or more by a proper ellipsis (…).
  const threeDots = new RegExp(/\.{3,}/, 'g');
  quote = quote.replace(threeDots, '…');

  // We replace all series of spaces by a single one.
  const spaces = new RegExp(/\s{2,}/, 'g');
  quote = quote.replace(spaces, ' ');

  // We replace all dashes between whitespace characters by a proper em dash (—).
  const dash = new RegExp(/\s-\s/, 'g');
  quote = quote.replace(dash, '—');

  // We add a period at the end of the quote if need be.
  const closingPunctuation = new RegExp(/[.\?!…’]$/);
  if (!quote.match(closingPunctuation)) quote = quote + '.';

  return quote;
}
