import React, { FC, useState } from "react";

import { Props, defaultData } from "./types";

const UnknownSettings: FC<Props> = ({ data = defaultData, setData }) => {
  return (
    <div className="JsSettings">
      <p className="info">
        Something has gone wrong, perhaps an incompatible config was imported?
      </p>
    </div>
  );
};

export default UnknownSettings;
