import React from "react";
import { defaultData, Props } from "./types";

const IpInfoSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="IpInfoSettings">
    <label>
      <input
        type="checkbox"
        checked={data.displayCity}
        onChange={() => setData({ ...data, displayCity: !data.displayCity })}
      />
      Display City
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.displayCountry}
        onChange={() =>
          setData({ ...data, displayCountry: !data.displayCountry })
        }
      />
      Display Country
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.maskIP}
        onChange={() =>
          setData({ ...data, maskIP: !data.maskIP })
        }
      />
      Mask IP
    </label>
  </div>
);

export default IpInfoSettings;
