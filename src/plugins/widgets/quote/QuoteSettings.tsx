import React, { FC } from "react";

import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    <p>
      Daily Quotes from 'They Said So' are no longer available, please see{" "}
      <a href="https://github.com/the-wright-jamie/tab-nine/issues/29">
        this GitHub issue
      </a>
      . We apologize for the inconvenience this may have caused.
    </p>
    <h5>Hourly Quotes</h5>
    <label>
      <input
        type="radio"
        checked={data.category === "developerexcuses"}
        onChange={() => setData({ category: "developerexcuses" })}
      />{" "}
      Developer Excuses
    </label>
    <p>
      Powered by{" "}
      <a
        href="http://www.developerexcuses.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developer Excuses
      </a>
    </p>
  </div>
);

export default QuoteSettings;
