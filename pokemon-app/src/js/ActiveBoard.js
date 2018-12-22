import React, { Component } from 'react';
import '../css/styles.css';

class ActiveBoard extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    grid1: null,
    grid2: null,
    grid3: null,
    grid4: null,
    grid5: null,
    grid6: null,
  }
}

  render() {

    return (
      <div className="grid" id="grid">
        <div className="grid-row">
          <div className="grid-column top left">
              <img className="grid-image" src={this.state.grid1} />
          </div>
          <div className="grid-column top middle">
              <img className="grid-image" src={this.state.grid2} />
          </div>
          <div className="grid-column top right">
              <img className="grid-image" src={this.state.grid3} />
          </div>
        </div>

        <div className="grid-row">
          <div className="grid-column bottom left">
              <img className="grid-image" src={this.state.grid4} />
          </div>
          <div className="grid-column bottom middle">
              <img className="grid-image" src={this.state.grid5} />
          </div>
          <div className="grid-column bottom right">
              <img className="grid-image" src={this.state.grid6} />
          </div>
        </div>

      </div>
    );
  }
}

export default ActiveBoard;
