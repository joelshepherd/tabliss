import * as React from 'react';

const Message = ({ message = 'Add something witty' }) => {
  return (
    <div className="Message">
      <h2 style={{ whiteSpace: 'pre' }}>{message}</h2>
    </div>
  );
};

export default Message;
