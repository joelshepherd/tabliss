import React from "react";

import categories from "./categories";
import { Props, defaultData, JokeAPICategory } from "./types";

const JokeSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="JokeSettings">
    <h5>Daily Joke</h5>
    <label>
      Category
      <select
        value={data.category}
        onChange={(event) => {
          setData({
            ...data,
            category: event.target.value as JokeAPICategory,
          });
        }}
      >
        {categories.map((category) => {
          const { key, name } = category;
          return (
            <option key={key} value={key}>
              {name}
            </option>
          );
        })}
      </select>
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.includeNSFW}
        onChange={(event) =>
          setData({ ...data, includeNSFW: event.target.checked })
        }
      />{" "}
      Include NSFW
    </label>

    <p>
      Powered by{" "}
      <a href="https://jokeapi.dev/" target="_blank" rel="noopener noreferrer">
        JokeAPI
      </a>
    </p>
  </div>
);

export default JokeSettings;
