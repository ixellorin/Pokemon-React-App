import React, { Component } from 'react';
import '../css/styles.css';

class ActiveBoard extends React.Component {

  constructor(props) {
  super(props);

  var activePokemon = this.props.pokemon;
  var grid = Array(6).fill(null);

  for (var i = 0; i < activePokemon.length; i++) {
    if (activePokemon[i] != null) {
      grid[i] = activePokemonImages[activePokemon[i].id - 1];
    }
  }

  this.state = {
    grid1: grid[0],
    grid2: grid[1],
    grid3: grid[2],
    grid4: grid[3],
    grid5: grid[4],
    grid6: grid[5],
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


function importAll(r) {
  return r.keys().map(r);
}

function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

    while(ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if(nn) return nn;
    }

    return ax.length - bx.length;
}

var activePokemonImages = importAll(require.context('../images/pokemon/activeIcons', true, /.*\.png$/)).sort(naturalCompare);


function fillArrayWithPokemon(array) {
  for (var i = 0; i < array.length; i++) {
    array[i] = activePokemonImages[Math.floor(Math.random() * 151)];
    }
  }

export default ActiveBoard;
