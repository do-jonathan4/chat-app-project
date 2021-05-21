import React from 'react';

const Messages = ({ messages, name }) => (
  <div>
    <h1>{messages}</h1>
    <h1>{name}</h1>
  </div>
);

export default Messages;
