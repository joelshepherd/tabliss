import React, { FC } from "react";
import { DebounceInput } from "../../shared";

import { Props, defaultData } from "./types";

const CustomTextSettings: FC<Props> = ({data = defaultData, setData}) => {
  return (
    <div className="CustomTextSettings">
      <label>
        Text
        <input
          type="text"
          value={data.text}
          onChange={(event) => setData({...data, text: event.target.value})}
        />

        Separator
        <input
          type="text"
          value={data.separator}
          onChange={(event)=> setData({...data, separator: event.target.value})}
        />
      </label>
    </div>
  )
};

export default CustomTextSettings;
