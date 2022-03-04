import React, { FC } from "react";

import { useCachedEffect } from "../../../hooks";
import { getQuote } from "./api";
import { Props, defaultData } from "./types";
import { HOURS } from "../../../utils";

import "./Quote.sass";

const EXPIRE_IN = 1 * HOURS;

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
