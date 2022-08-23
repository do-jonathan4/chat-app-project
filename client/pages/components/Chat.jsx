import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';


const ENDPOINT = 'https://group-chat-app1.herokuapp.com/';
// const ENDPOINT = 'http://localhost:3001/';

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
    });
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
    //flex feature
    socket.on('userExists', alertMsg => {
      if(!alert(alertMsg)) window.location.replace('/')
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="chatOuterContainer">
      <div className="chatInnerContainer">
        <InfoBar room={room} users={users} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default Chat;
