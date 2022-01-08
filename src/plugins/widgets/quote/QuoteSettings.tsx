import React, { FC } from "react";

import categories from "./categories";
import { Props, defaultData } from "./types";

const QuoteSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    <label>
      <input
        type="radio"
        checked={data.category === undefined}
        onChange={() => setData({ category: undefined })}
      />{" "}
      All Categories
    </label>

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
      {" and "}
      <a
        href="http://www.developerexcuses.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developer Excuses
      </a>
      .
    </p>
  </div>
);

export default QuoteSettings;
