import * as React from 'react';

const Message = ({ message = 'Something witty' }) => {
  return (
    <div className="Message">
      <h1>{message}</h1>
    </div>
  );
};

export default Message;
