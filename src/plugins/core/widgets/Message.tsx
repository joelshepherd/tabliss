import * as React from 'react';

const Message = ({ message = 'Something witty' }) => {
  return (
    <div className="Message">
      <h2>{message}</h2>
    </div>
  );
};

export default Message;
