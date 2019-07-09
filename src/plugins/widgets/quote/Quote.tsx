import React, { FC, useEffect } from 'react';

import { getQuote } from './api';
import { Props, defaultData } from './types';
import './Quote.sass';

const Quote: FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  useEffect(() => {
    getQuote(loader, data.category).then(setCache);
  }, [data.category]);

  if (cache) {
    return (
      <h4 className="Quote">
        "{cache.quote}"
        {cache.author && (
          <sub>
            <br />
            &mdash; {cache.author}
          </sub>
        )}
      </h4>
    );
  }

  return null;
};

export default Quote;
