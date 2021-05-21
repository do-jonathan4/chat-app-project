import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
  <form>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
  </form>
)

export default Input;