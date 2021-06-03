import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => {
        if (event.key === 'Enter') {
          sendMessage(event)
          setMessage('')
        }}}
    />
    <button
      className="sendButton"
      onClick={event => {
        sendMessage(event)
        setMessage('')
      }}
    >Send</button>
  </form>
)

export default Input;
