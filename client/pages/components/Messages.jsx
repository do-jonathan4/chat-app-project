import React, { useEffect, useRef } from 'react'

import Message from './Message';

const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="messages">
      {messages.map((message, index) => <div key={index}><Message message={message} name={name} /></div>)}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages;
