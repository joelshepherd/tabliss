import React, { FC } from "react";

import { Props, defaultData } from "./types";

const CustomTextSettings: FC<Props> = ({data = defaultData, setData}) => {
  return (
    <div className="CustomTextSettings">
      <label>
        Text
        <textarea
          style={{resize: "none", overflow: "scroll"}}
          value={data.text}
          rows={10}
          onChange={(event) => setData({...data, text: event.target.value})}
        />

        Separator
        <input
          type="text"
          value={data.separator}
          disabled={data.atNewline}
          onChange={(event)=> setData({...data, separator: event.target.value})}
        />

        Separate at newline
        <input
          type="checkbox"
          checked={data.atNewline}
          onChange={(event) => {

            setData({...data, separator: "", atNewline: event.target.checked})

          }
        }
        />

      </label>
    </div>
  )
};

export default CustomTextSettings;
