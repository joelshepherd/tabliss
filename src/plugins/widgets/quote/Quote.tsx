import React from "react";
import { useCachedEffect } from "../../../hooks";
import { HOURS } from "../../../utils";
import { getQuote } from "./api";
import "./Quote.sass";
import { defaultData, Props } from "./types";

const EXPIRE_IN = 1 * HOURS;

const Quote: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      getQuote(loader, data.category ?? "inspire").then(setCache);
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
