import React, { FC } from "react";

import { engines } from "./engines";
import { Props, defaultData, SEARCH_ENGINE_CUSTOM } from "./types";

const SearchSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <label>
      Search Provider
      <select
        onChange={(event) =>
          setData({ ...data, searchEngine: event.target.value })
        }
        value={data.searchEngine}
      >
        {engines.map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
        <option value={SEARCH_ENGINE_CUSTOM}>
          Custom
        </option>
      </select>
    </label>

    {data.searchEngine === SEARCH_ENGINE_CUSTOM && (
      <>
        <label>
          Custom Search Provider
          <input
            type="text"
            value={data.searchEngineCustom}
            onChange={(event) =>
              setData({
                ...data,
                searchEngineCustom: event.target.value,
              })
            }
          />
        </label>

        <p className="info">
          Warning: This functionality is intended for advanced users.
          &#123;searchTerms&#125; is replaced by the entered search term.
        </p>
      </>
    )}

    {BUILD_TARGET === "web" && (
      <label>
        Suggestions Provider
        <select
          onChange={(event) =>
            setData({ ...data, suggestionsEngine: event.target.value })
          }
          value={data.suggestionsEngine}
        >
          <option key="off" value="">
            Off
          </option>
          {engines
            .filter(({ suggest_url }) => Boolean(suggest_url))
            .map(({ key, name }) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
        </select>
      </label>
    )}

    {data.suggestionsEngine && (
      <label>
        Suggestion Quanitity
        <input
          type="number"
          min="1"
          max="10"
          value={data.suggestionsQuantity}
          onChange={(event) =>
            setData({
              ...data,
              suggestionsQuantity: Number(event.target.value),
            })
          }
        />
      </label>
    )}
  </div>
);

export default SearchSettings;
