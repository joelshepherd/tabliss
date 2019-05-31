import React from 'react';

const Message = ({ message = 'Add something witty' }) => {
  return (
    <div className="Message">
      <h3 style={{ whiteSpace: 'pre' }}>{message}</h3>
    </div>
  );
};

export default Message;
