import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { Props, defaultData } from "./types";

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GradientSettings">
    <label>
    <FormattedMessage
          id="backgrounds.gradient.fromColour"
          defaultMessage="From Colour"
          description="From Colour title"
        />
      <input
        type="color"
        value={data.from}
        onChange={(event) => setData({ ...data, from: event.target.value })}
      />
    </label>

    <label>
    <FormattedMessage
          id="backgrounds.gradient.toColour"
          defaultMessage="To Colour"
          description="To Colour title"
        />
      <input
        type="color"
        value={data.to}
        onChange={(event) => setData({ ...data, to: event.target.value })}
      />
    </label>

    <label>
    <FormattedMessage
          id="backgrounds.gradient.angle"
          defaultMessage="Angle"
          description="Angle title"
        />
        (0-360)
      <input
        type="number"
        value={data.angle}
        onChange={(event) =>
          setData({ ...data, angle: Number(event.target.value) })
        }
      />
    </label>
  </div>
);

export default GradientSettings;
