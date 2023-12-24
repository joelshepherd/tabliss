import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { Props, defaultData } from "./types";

const ColourSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="ColourSettings">
    <label>
      <FormattedMessage
          id="colour"
          defaultMessage="Colour"
          description="Colour title"
        />
      <input
        type="color"
        value={data.colour}
        onChange={(event) => setData({ colour: event.target.value })}
      />
    </label>
  </div>
);

export default ColourSettings;
