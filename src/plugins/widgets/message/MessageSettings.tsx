import React, { FC } from "react";

import { Props, defaultData } from "./types";

const MessageSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <label>
      Message
      <textarea
        rows={3}
        value={data.messages[0]}
        onChange={(event) => setData({ messages: [event.target.value] })}
      />
    </label>
  </div>
);

export default MessageSettings;
