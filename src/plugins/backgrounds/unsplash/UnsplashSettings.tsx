import React from "react";
import { FormattedMessage } from "react-intl";
import { Icon } from "../../../views/shared";
import { DebounceInput } from "../../shared";
import topics from "./topics.json";
import { defaultData, Props } from "./types";

const UnsplashSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="UnsplashSettings">
    <label>
      <span style={{ float: "right" }}>
        {data.paused ? <span className="text--grey">(Paused) </span> : null}
        <a onClick={() => setData({ ...data, paused: !data.paused })}>
          <Icon name={data.paused ? "play" : "pause"} />
        </a>
      </span>
      <FormattedMessage
          id="backgrounds.unsplash.showNewPhoto"
          defaultMessage="Show a new photo"
          description="Show a new photo title"
        />
      <select
        value={data.timeout}
        onChange={(event) =>
          setData({ ...data, timeout: Number(event.target.value) })
        }
      >
        <option value="0"><FormattedMessage
          id="backgrounds.unsplash.everyNewTab"
          defaultMessage="Every new tab"
          description="Every new tab title"
        /></option>
        <option value="300"><FormattedMessage
          id="plugins.every5min"
          defaultMessage="Every 5 minutes"
          description="Every 5 minutes< title"
        /></option>
        <option value="900"><FormattedMessage
          id="plugins.every15min"
          defaultMessage="Every 15 minutes"
          description="Every 15 minutes title"
        /></option>
        <option value="3600"><FormattedMessage
          id="plugins.everyHour"
          defaultMessage="Every hour"
          description="Every hour title"
        /></option>
        <option value="86400"><FormattedMessage
          id="plugins.everyDay"
          defaultMessage="Every day"
          description="Every day title"
        /></option>
        <option value="604800"><FormattedMessage
          id="plugins.everyWeek"
          defaultMessage="Every week"
          description="Every week title"
        /></option>
      </select>
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "official"}
        onChange={() => setData({ ...data, by: "official" })}
      />{" "}
      <FormattedMessage
          id="backgrounds.unsplash.officialCollection"
          defaultMessage="Official Collection"
          description="Official Collection title"
        />
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "topics"}
        onChange={() => setData({ ...data, by: "topics" })}
      />{" "}
      <FormattedMessage
          id="backgrounds.unsplash.topic"
          defaultMessage="Topic"
          description="Topic title"
        />
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "search"}
        onChange={() => setData({ ...data, by: "search" })}
      />{" "}
      <FormattedMessage
          id="backgrounds.unsplash.search"
          defaultMessage="Search"
          description="Search title"
        />
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "collections"}
        onChange={() => setData({ ...data, by: "collections" })}
      />{" "}
      <FormattedMessage
          id="backgrounds.unsplash.collection"
          defaultMessage="Collection"
          description="Collection title"
        />
    </label>

    {data.by === "topics" && (
      <label>
        <FormattedMessage
          id="backgrounds.unsplash.topic"
          defaultMessage="Topic"
          description="Topic title"
        />
        <select
          value={data.topics}
          onChange={(event) => setData({ ...data, topics: event.target.value })}
        >
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </label>
    )}

    {data.by === "search" && (
      <>
        <label>
          <FormattedMessage
          id="backgrounds.unsplash.tags"
          defaultMessage="Tags"
          description="Tags title"
        />
          <DebounceInput
            type="text"
            value={data.search}
            placeholder="Try landscapes or animals..."
            onChange={(value) => setData({ ...data, search: value })}
            wait={500}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(event) => setData({ ...data, featured: !data.featured })}
          />{" "}
          <FormattedMessage
          id="backgrounds.unsplash.onlyFeaturedImages"
          defaultMessage="Only featured images"
          description="Only featured images title"
        />
        </label>
      </>
    )}

    {data.by === "collections" && (
      <label>
        <FormattedMessage
          id="backgrounds.unsplash.collection"
          defaultMessage="Collection"
          description="Collection title"
        />
        
        <DebounceInput
          type="text"
          value={data.collections}
          placeholder="Collection ID number"
          onChange={(value) => setData({ ...data, collections: value })}
          wait={500}
        />
      </label>
    )}
  </div>
);

export default UnsplashSettings;
