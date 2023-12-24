import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import categories from "./categories";
import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    <h5><FormattedMessage
          id="plugins.quotes.dailyQuotes"
          defaultMessage="Daily Quotes"
          description="Daily Quotes title"
        /></h5>
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
    <FormattedMessage
          id="plugins.poweredBy"
          defaultMessage="Powered by"
          description="Powered by title"
        />{" "}
      <a
        href="https://theysaidso.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        They Said So
      </a>
    </p>
    <h5><FormattedMessage
          id="plugins.quotes.hourlyQuotes"
          defaultMessage="Hourly Quotes"
          description="Hourly Quotes title"
        /></h5>
    <label>
      <input
        type="radio"
        checked={data.category === "developerexcuses"}
        onChange={() => setData({ category: "developerexcuses" })}
      />{" "}
      Developer Excuses
    </label>
    <p>
    <FormattedMessage
          id="plugins.poweredBy"
          defaultMessage="Powered by"
          description="Powered by title"
        />{" "}
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
