import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Input from './Input';

const ENDPOINT = 'http://localhost:3000/';


const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io(ENDPOINT);

  useEffect(() => {

    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
      console.log('hello')
    });

  }, [ENDPOINT, location.search]);

  useEffect(() => {

    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users)
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      // console.log(message)
    }
  }

  return (
      <div className="container">
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
  );
}

export default Chat;
