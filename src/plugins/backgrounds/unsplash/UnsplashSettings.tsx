import React from "react";
import { DebounceInput } from "../../shared";
import * as API from "./api";
import { defaultData, Props } from "./types";

const UnsplashSettings: React.FC<Props> = ({ data = defaultData, setData }) => {
  const [topics, setTopics] = React.useState<API.Topic[] | null>(null);
  React.useEffect(() => {
    API.fetchTopics().then(setTopics);
  }, []);

  return (

    <div className="UnsplashSettings grid-container">
      <label  className="cell-1">

        Show a new photo
        <select
          value={data.timeout}
          onChange={(event) =>
            setData({ ...data, timeout: Number(event.target.value) })
          }
        >
          <option value="0">Every new tab</option>
          <option value="300">Every 5 minutes</option>
          <option value="900">Every 15 minutes</option>
          <option value="3600">Every hour</option>
          <option value="86400">Every day</option>
          <option value={Number.MAX_SAFE_INTEGER}>Pause</option>
        </select>
      </label>

      <label className="cell-4">

        <input
          type="radio"
          checked={data.by === "official"}
          onChange={() => setData({ ...data, by: "official" })}
        />{" "}
        Official Collection
      </label>


      <label className="cell-4">

        <input
          type="radio"
          checked={data.by === "topics"}
          onChange={() => setData({ ...data, by: "topics" })}
        />{" "}
        Topic
      </label>

      {data.by === "topics" && (
        <label>
          Topic
          <select
            value={data.topics}
            onChange={(event) =>
              setData({ ...data, topics: event.target.value })
            }
          >
            {topics === null ? (
              <option disabled>Loading...</option>
            ) : (
              topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))
            )}
          </select>
        </label>
      )}


      <label className="cell-4">

        <input
          type="radio"
          checked={data.by === "search"}
          onChange={() => setData({ ...data, by: "search" })}
        />{" "}
        Search
      </label>

      {data.by === "search" && (
        <div>
          <label>
            Tags
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
              onChange={(event) =>
                setData({ ...data, featured: !data.featured })
              }
            />{" "}
            Only featured images
          </label>
        </div>
      )}

      <label className="cell-4">

        <input
          type="radio"
          checked={data.by === "collections"}
          onChange={() => setData({ ...data, by: "collections" })}
        />{" "}
        Collection
      </label>

      {data.by === "collections" && (
        <label>
          Collection
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
};


export default UnsplashSettings;

