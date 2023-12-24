import React from "react";
import { FormattedMessage } from "react-intl";
import { MINUTES, HOURS } from "../../../utils";

import categories from "./categories";
import { Props, defaultData, JokeAPICategory } from "./types";

function updateSelectedCategories(
  existingCategories: Set<JokeAPICategory>,
  updatedCategory: JokeAPICategory,
  checked: boolean,
): Set<JokeAPICategory> {
  const isAnyCategoryChecked = updatedCategory === "any" && checked;
  const isLastItemBeingUnchecked = !checked && existingCategories.size === 1;

  if (isLastItemBeingUnchecked) {
    return existingCategories;
  }

  if (isAnyCategoryChecked) {
    return new Set(["any"]);
  }

  const categories = new Set(existingCategories);

  categories.delete("any");

  checked
    ? categories.add(updatedCategory)
    : categories.delete(updatedCategory);

  return categories;
}

const JokeSettings: React.FC<Props> = ({ data = defaultData, setData }) => {
  return (
    <div className="JokeSettings">
      <h5><FormattedMessage
          id="plugins.joke.dailyJoke"
          defaultMessage="Daily Joke"
          description="Daily Joke title"
        /></h5>

      <label>
        <FormattedMessage
          id="plugins.joke.showANewJoke"
          defaultMessage="Show a new joke"
          description="Show a new joke title"
        />
        <select
          value={data.timeout}
          onChange={(event) =>
            setData({ ...data, timeout: Number(event.target.value) })
          }
        >
          <option value={5 * MINUTES}><FormattedMessage
          id="plugins.every5min"
          defaultMessage="Every 5 minutes"
          description="Every 5 minutes title"
        /></option>
          <option value={15 * MINUTES}><FormattedMessage
          id="plugins.every15min"
          defaultMessage="Every 15 minutes"
          description="Every 15 minutes title"
        /></option>
          <option value={HOURS}><FormattedMessage
          id="plugins.everyHour"
          defaultMessage="Every hour"
          description="Every hour title"
        /></option>
          <option value={24 * HOURS}><FormattedMessage
          id="plugins.everyDay"
          defaultMessage="Every day"
          description="Every day title"
        /></option>
          <option value={7 * 24 * HOURS}><FormattedMessage
          id="plugins.everyWeek"
          defaultMessage="Every week"
          description="Every week title"
        /></option>
        </select>
      </label>
      <label>
        <FormattedMessage
          id="plugins.joke.category"
          defaultMessage="Category"
          description="Category title"
        />
        {categories.map((category) => {
          return (
            <label key={category.key}>
              <input
                type="checkbox"
                checked={data.categories.has(category.key)}
                onChange={(event) => {
                  const categories = updateSelectedCategories(
                    data.categories,
                    category.key,
                    event.target.checked,
                  );

                  setData({ ...data, categories });
                }}
              />{" "}
              {category.name}
            </label>
          );
        })}
      </label>

      <p>
      <FormattedMessage
          id="plugins.poweredBy"
          defaultMessage="Powered by"
          description="Powered by title"
        />{" "}
        <a
          href="https://jokeapi.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          JokeAPI
        </a>
      </p>
    </div>
  );
};

export default JokeSettings;
