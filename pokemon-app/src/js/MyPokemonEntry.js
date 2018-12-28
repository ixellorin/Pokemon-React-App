import React, { Component } from 'react';
import '../css/styles.css';
import classNames from 'classnames';
var optionsButton = require('../images/misc/expand_button.png');

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
          <img className="entry-options-button" onClick={(e) => this.props.toggleEntryOptions(this.props.pokemon, e)} src={optionsButton}/>
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

var myPokemonImages = importAll(require.context('../images/pokemon/myPokemonIcons', true, /.*\.png$/));

export default MyPokemonEntry;
