import React from "react";
import "./header.css";

export default ({ black }) => (
  <header className={black ? "black" : ""}>
    <div className="header--logo">
      <a href="/.">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
          alt="Netlix"
        />
      </a>
    </div>
    <div className="header--user">
      <a href="/">
        <img
          src="https://i.pinimg.com/474x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
          alt="Usuário"
        />
      </a>
    </div>
  </header>
);
