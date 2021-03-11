import React, { FC } from 'react';

import { useCachedEffect } from '../../../hooks';
import { getQuote } from './api';
import { Props, defaultData } from './types';
import './Quote.sass';

const EXPIRE_IN = 60 * 60 * 1000; // 1 hour

const Quote: FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  useCachedEffect(
    () => {
      getQuote(loader, data.category).then(setCache);
    },
    cache ? cache.timestamp + EXPIRE_IN : 0,
    [data.category],
  );

  if (!cache) {
    return null;
  }

  return (
    <div className="Quote">
      <h4 className="QuoteContent">
        “{cache.quote}”
        {cache.author && (
          <sub>
            <br />
            &mdash; {cache.author}
          </sub>
        )}
      </h4>
    </div>
  );
};

export default Quote;
