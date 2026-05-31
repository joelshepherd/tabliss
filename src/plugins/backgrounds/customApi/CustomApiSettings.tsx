import React from "react";
import { DebounceInput } from "../../shared";
import { defaultData, Props } from "./types";

const CustomApiSettings: React.FC<Props> = ({
  data = defaultData,
  setData,
  setCache,
}) => (
  <div className="CustomApiSettings">
    <label>
      Method
      <select
        value={data.method}
        onChange={(event) =>
          setData({
            ...data,
            method: event.target.value as "GET" | "POST",
          })
        }
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </label>

    <label>
      URL
      <DebounceInput
        type="text"
        value={data.url}
        placeholder="https://example.com/api/image"
        onChange={(value) => setData({ ...data, url: value })}
        wait={500}
      />
    </label>

    {data.method === "POST" && (
      <label>
        Request body
        <textarea
          value={data.body}
          placeholder='{"key": "value"}'
          onChange={(event) => setData({ ...data, body: event.target.value })}
          rows={4}
        />
      </label>
    )}

    <label>
      <input
        type="radio"
        checked={data.responseType === "image"}
        onChange={() => setData({ ...data, responseType: "image" })}
      />{" "}
      Use URL as background image directly
    </label>

    <label>
      <input
        type="radio"
        checked={data.responseType === "direct"}
        onChange={() => setData({ ...data, responseType: "direct" })}
      />{" "}
      API response body is an image URL (plain text)
    </label>

    <label>
      <input
        type="radio"
        checked={data.responseType === "json"}
        onChange={() => setData({ ...data, responseType: "json" })}
      />{" "}
      Extract image URL from JSON response
    </label>

    {data.responseType === "json" && (
      <label>
        JSON path
        <DebounceInput
          type="text"
          value={data.jsonPath}
          placeholder="data.url"
          onChange={(value) => setData({ ...data, jsonPath: value })}
          wait={500}
        />
        <small>Supports dot-notation, e.g. data.url or items[0].src</small>
      </label>
    )}

    {data.responseType !== "image" && (
      <>
        <label>
          Show a new image
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
            type="checkbox"
            checked={data.paused}
            onChange={() => setData({ ...data, paused: !data.paused })}
          />{" "}
          Pause automatic updates
        </label>

        <button onClick={() => setCache(undefined)}>Fetch now</button>
      </>
    )}
  </div>
);

export default CustomApiSettings;
