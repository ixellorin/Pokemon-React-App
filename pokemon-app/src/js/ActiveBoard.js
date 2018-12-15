import React, { Component } from 'react';
import '../css/styles.css';

class ActiveBoard extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    grid1: this.props.pokemon[0],
    grid2: this.props.pokemon[1],
    grid3: this.props.pokemon[2],
    grid4: this.props.pokemon[3],
    grid5: this.props.pokemon[4],
    grid6: this.props.pokemon[5],
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
