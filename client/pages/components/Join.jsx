import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    const num = Math.floor(Math.random() * 100);
    setName(`demo-user-${num}`);
    setRoom('demo-room');
  }, []);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1>Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)} />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput"
            type="text"
            value={room}
            onChange={event => setRoom(event.target.value)} />
        </div>
        <Link
          onClick={event => (!name || !room) ? event.preventDefault() : null}
          to={`/chat?name=${name}&room=${room}`}>
          <button className="joinButton" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
