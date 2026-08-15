import React from "react";
import { Icon } from "../../../views/shared";
import { DebounceInput } from "../../shared";
import { defaultData, Props } from "./types";

const PexelsSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="PexelsSettings">
    <label>
      <span style={{ float: "right" }}>
        {data.paused ? <span className="text--grey">(Paused) </span> : null}
        <a onClick={() => setData({ ...data, paused: !data.paused })}>
          <Icon name={data.paused ? "play" : "pause"} />
        </a>
      </span>
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
        <option value="604800">Every week</option>
      </select>
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "curated"}
        onChange={() => setData({ ...data, by: "curated" })}
      />{" "}
      Curated
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "search"}
        onChange={() => setData({ ...data, by: "search" })}
      />{" "}
      Search
    </label>

    {data.by === "search" && (
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
    )}
  </div>
);

export default PexelsSettings;
