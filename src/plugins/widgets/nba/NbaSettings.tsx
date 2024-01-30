import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const NbaSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="NbaSettings">
    <label>
      <input
        type="checkbox"
        checked={data.displayLogo}
        onChange={() => setData({ ...data, displayLogo: !data.displayLogo })}
      />{" "}
      <FormattedMessage
          id="plugins.nba.displayTeamLogo"
          defaultMessage="Display team logo"
          description="Display team logo title"
        />
    </label>
  </div>
);

export default NbaSettings;
