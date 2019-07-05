import React, { FC, useEffect } from 'react';

import { useTime } from '../../../utils/useTime';
import { getTimeCode, getQuoteByTimeCode } from './api';
import { Props, defaultData } from './types';
import './LiteratureClock.sass';

const LiteratureClock: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
}) => {
  const time = useTime();
  const timeCode = getTimeCode(time);

  useEffect(() => {
    getQuoteByTimeCode(timeCode).then(setCache);
  }, [timeCode]);

  if (!cache) {
    return null;
  }

  return (
    <div className={`LiteratureClock ${data.centerText ? 'center' : ''}`}>
      <blockquote>
        <span className="quote_first">{cache.quote_first}</span>
        <strong className="quote_time_case">{cache.quote_time_case}</strong>
        <span className="quote_last">{cache.quote_last}</span>
      </blockquote>

      {data.showBookAndAuthor && cache.title && cache.author && (
        <cite>
          &mdash;
          <span id="book">{cache.title}</span>
          {', '}
          <span id="author">{cache.author}</span>
        </cite>
      )}
    </div>
  );
};

export default LiteratureClock;
