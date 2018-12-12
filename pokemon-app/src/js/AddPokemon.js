import React, { Component } from 'react';
import '../css/styles.css';
import classNames from 'classnames';

var addPokemonButton = classNames({
  'add-pokemon-list-button': true,
  'button': true
});

// var images = require.context('../images/pokemon', true, /.*\.png$/);


class AddPokemon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {



    var pokemon = this.props.listOfPokemon;
    var buttonsList = pokemon.map(function(pokemon) {
      console.log(pokemon.name);
      return <li className="add-pokemon-list-item"><button className={addPokemonButton}>{pokemon.name}</button></li>
    })

    return (
      <div className="add-pokemon-dialog" id="add-pokemon-dialog">
        <h1>Add Pokemon</h1>
        <ul className="add-pokemon-list">
          {buttonsList}
        </ul>
      </div>
    );
  }
}

export default AddPokemon;
