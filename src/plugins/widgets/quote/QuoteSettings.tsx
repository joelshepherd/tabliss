import React, { FC } from "react";

import categories from "./categories";
import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    <h5>Daily Quotes</h5>
    {categories.map((category) => (
      <label key={category.key}>
        <input
          type="radio"
          checked={data.category === category.key}
          onChange={() => setData({ category: category.key })}
        />{" "}
        {category.name}
      </label>
    ))}
    <p>
      Powered by{" "}
      <a
        href="https://theysaidso.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        They Said So
      </a>
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
