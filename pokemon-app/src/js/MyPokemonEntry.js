import React, { Component } from 'react';
import '../css/styles.css';
import classNames from 'classnames';

var addPokemonButton = classNames({
  'my-pokemon-buttons': true,
  'add-pokemon': true,
  'button': true
});

var removePokemonButton = classNames({
  'my-pokemon-buttons': true,
  'remove-pokemon-button': true,
  'button': true
});

var pokemon = null;

class MyPokemonEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="my-pokemon-entry">
          <img className="my-pokemon-entry-image" src={myPokemonImages[this.props.pokemon.id]} />
          {this.props.pokemon.name}
          <button onClick={() => this.props.removePokemon(this.props.pokemon)} className="remove-entry-button">&#10006;</button>
      </div>
  );
}
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
  return images;
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

var myPokemonImages = importAll(require.context('../images/pokemon/myPokemonIcons', true, /.*\.png$/));

export default MyPokemonEntry;
