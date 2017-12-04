import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  message?: string;
  onChange: (settings: Settings) => void;
}

const MessageSettings: React.StatelessComponent<Props> = ({ message = 'Add something witty', onChange }) => {
  return (
    <div className="MessageSettings">
      <label>
        Message
        <textarea
          rows={3}
          value={message}
          onChange={event => onChange({ message: event.target.value })}
        />
      </label>
    </div>
  );
};

export default MessageSettings;
