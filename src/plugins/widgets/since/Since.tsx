import React, { FC } from "react";
import { FormattedRelativeTime } from "react-intl";

import { useTime } from "../../../hooks";
import { Props, defaultData } from "./types";
import "./Since.sass";

const Since: FC<Props> = ({ data = defaultData }) => {

  const from = useTime().getTime();
  const to = data.time;
  const diff = ((to - from) / 1000) | 0;


  return (
    <div className="Since">
      <h3>
        {data.title || "Since"}&nbsp;
        {diff > 0 ? "will be" : "was"}&nbsp;
        <span className={`Since relativeTime`}>
          <FormattedRelativeTime value={diff} updateIntervalInSeconds={1} />
        </span>
      </h3>
    </div>
  );
};

export default Since;
