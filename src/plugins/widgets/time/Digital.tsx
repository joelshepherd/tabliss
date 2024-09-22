import React, { FC } from "react";

import IntlTime from "./IntlTime";
import IntlTimeSeconds from "./IntlTimeSeconds";

type Props = {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  showDayPeriod: boolean;
  time: Date;
};

const Digital: FC<Props> = (props) => (
  <div
    className="Time Digital"
    style={{
      display: "flex",
      alignItems: "baseline",
      // justifyContent: "center",
      gap: "10px",
    }}
  >
    <h1>
      <IntlTime {...props} />
    </h1>
    {props.showSeconds && (
      <h1 className="Seconds">
        <IntlTimeSeconds {...props} />
      </h1>
    )}
  </div>
);

export default Digital;
