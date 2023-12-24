import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";
import { DebounceInput } from "../../shared";

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <label>
    <FormattedMessage
          id="backgrounds.giphy.tag"
          defaultMessage="Tag"
          description="Tag title"
        />
      <DebounceInput
        type="text"
        value={data.tag}
        onChange={(value) => setData({ ...data, tag: value })}
        wait={500}
      />
    </label>
    <p className="info"><FormattedMessage
          id="backgrounds.giphy.tag.Info"
          defaultMessage="Separate multiple tags with a comma"
          description="Tag info"
        /></p>

    <label>
      <input
        type="checkbox"
        checked={data.expand}
        onChange={(event) => setData({ ...data, expand: !data.expand })}
      />{" "}
      <FormattedMessage
          id="backgrounds.giphy.stretchToFillScreen"
          defaultMessage="Stretch to fill screen"
          description="Stretch to fill screen info"
        />
    </label>

    <label>
      <input
        type="checkbox"
        checked={!data.nsfw}
        onChange={(event) => setData({ ...data, nsfw: !data.nsfw })}
      />{" "}
      <FormattedMessage
          id="backgrounds.giphy.safeSearch"
          defaultMessage="Safe Search"
          description="Safe Search title"
        />
    </label>
  </div>
);

export default GiphySettings;
