import React, { Component } from 'react';
import '../css/styles.css';

// var images = require.context('../images/pokemon', true, /.*\.png$/);


class AddPokemon extends React.Component {


  render() {

    var pokemon = Array(10).fill("Pokemon");
    var pokemonList = pokemon. map(function(name) {
      return <li><button className="button">{name}</button></li>
    })

    return (
      <div className="add-pokemon-dialog" id="add-pokemon-dialog">
        <h1>Add Pokemon</h1>
        <ul>
          {pokemonList}
        </ul>
      </div>
    );
  }
}

export default AddPokemon;
