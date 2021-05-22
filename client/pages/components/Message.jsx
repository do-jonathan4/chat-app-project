import React from 'react';

const Message = ({ message: { text, user }} ) => {
  return (
    <div>
      <p>{text}</p>
      <p>{user}</p>
    </div>
  );
}

export default Message;
