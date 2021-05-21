import React from 'react';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftContainer">
      <img className="onlineIcon" alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightrContainer">
      <a href="/"><img alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;
