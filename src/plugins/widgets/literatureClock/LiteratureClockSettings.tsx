import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const LiteratureClockSettings: FC<Props> = ({
  data = defaultData,
  setData,
}) => (
  <div className="LiteratureClockSettings">
    <label>
      <input
        type="checkbox"
        checked={data.showBookAndAuthor}
        onChange={() =>
          setData({ ...data, showBookAndAuthor: !data.showBookAndAuthor })
        }
      />{" "}
      <FormattedMessage
          id="plugins.literatureClock.displayBookAndAuthor"
          defaultMessage="Display book and author"
          description="Display book and author title"
        />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.centerText}
        onChange={() => setData({ ...data, centerText: !data.centerText })}
      />{" "}
      <FormattedMessage
          id="plugins.literatureClock.alignTextAtCenter"
          defaultMessage="Align text at center"
          description="Align text at center title"
        />
    </label>
  </div>
);

export default LiteratureClockSettings;
