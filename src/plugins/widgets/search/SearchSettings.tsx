import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { engines } from "./engines";
import { Props, defaultData } from "./types";

const SearchSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <label>
      <FormattedMessage
          id="plugins.search.provider"
          defaultMessage="Search Provider"
          description="Search Provider title"
        />
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
      </select>
    </label>

    {BUILD_TARGET === "web" && (
      <label>
        <FormattedMessage
          id="plugins.search.suggestionsProvider"
          defaultMessage="Suggestions Provider"
          description="Suggestions Provider title"
        />
        <select
          onChange={(event) =>
            setData({ ...data, suggestionsEngine: event.target.value })
          }
          value={data.suggestionsEngine}
        >
          <option key="off" value="">
            <FormattedMessage
          id="plugins.off"
          defaultMessage="Off"
          description="Off title"
        />
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
        <FormattedMessage
          id="plugins.search.suggestionsQuanitity"
          defaultMessage="Suggestion Quanitity"
          description="Suggestion Quanitity title"
        />
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
