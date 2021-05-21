import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';


const ENDPOINT = 'http://localhost:3001/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
      //message panel
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
     });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={message} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
  );
}

export default Chat;
