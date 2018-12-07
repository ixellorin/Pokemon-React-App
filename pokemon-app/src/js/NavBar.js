import React, { Component } from 'react';
import '../css/styles.css'

class NavBar extends Component {
  render() {
    return (
      <div id="navbar">
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="./portfolio.html">Portfolio</a></li>
          <li><a href="./about.html">About</a></li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
