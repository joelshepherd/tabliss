import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const MessageSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <label>
      <FormattedMessage
          id="plugins.message"
          defaultMessage="Message"
          description="Message title"
        />
      <textarea
        rows={3}
        value={data.messages[0]}
        onChange={(event) => setData({ messages: [event.target.value] })}
      />
    </label>
  </div>
);

export default MessageSettings;
