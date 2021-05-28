import React from 'react';

const Message = ({ message: { text, user }, name } ) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pad-right">{trimmedName}</p>
          <div className="messageBox bg-blue">
            <p className="messageText white">{text}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox bg-white">
            <p className="messageText dark">{text}</p>
          </div>
          <p className="sentText pad-left">{user}</p>
        </div>
      )
  );
}

export default Message;
