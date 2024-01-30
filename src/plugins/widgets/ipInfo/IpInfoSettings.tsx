import React from "react";
import { FormattedMessage } from "react-intl";
import { defaultData, Props } from "./types";

const IpInfoSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="IpInfoSettings">
    <label>
      <input
        type="checkbox"
        checked={data.displayCity}
        onChange={() => setData({ ...data, displayCity: !data.displayCity })}
      />
      <FormattedMessage
          id="plugins.ipInfo.displayCity"
          defaultMessage="Display City"
          description="Display City title"
        />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.displayCountry}
        onChange={() =>
          setData({ ...data, displayCountry: !data.displayCountry })
        }
      />
      <FormattedMessage
          id="plugins.ipInfo.displayCountry"
          defaultMessage="Display Country"
          description="Display Country title"
        />
    </label>
  </div>
);

export default IpInfoSettings;
