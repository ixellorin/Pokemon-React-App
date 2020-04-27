import React from 'react';
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
              {this.getImage(0)}
          </div>
          <div className="grid-column top right">
              {this.getImage(1)}
          </div>
        </div>

        <div className="grid-row">
          <div className="grid-column middle left">
              {this.getImage(2)}
          </div>
          <div className="grid-column middle right">
              {this.getImage(3)}
          </div>
        </div>

        <div className="grid-row">
          <div className="grid-column bottom left">
              {this.getImage(4)}
          </div>
          <div className="grid-column bottom right">
              {this.getImage(5)}
          </div>
        </div>

      </div>
    );
  }

  getImage(i) {
    console.log(this.props.pokemon);
    if (this.props.pokemon[i] == null) {
      return <img className="grid-image" src={filler} />;
    } else {
      return <img className="grid-image" onClick={(e) => this.props.onClick(this.props.pokemon[i], e)} src={activePokemonImages[this.props.pokemon[i].id - 1]} />;
    }
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

var filler = require("../images/misc/active_filler.png");

export default ActiveBoard;
