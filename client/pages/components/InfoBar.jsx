import React from 'react';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftContainer">
      <i className="onlineIcon"></i>
      <h3>{room}</h3>
    </div>
    <div className="rightContainer">
      <a href="/">
        <i className="fa fa-times fa_custom fa-2x"></i>
      </a>
    </div>
  </div>
);

export default InfoBar;
