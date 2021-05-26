import React from 'react';

import Message from './Message';

const Messages = ({ messages, name }) => (
  <div className="messages">
    {messages.map((message, index) => <div key={index}><Message message={message} name={name} /></div>)}
  </div>
);

export default Messages;
