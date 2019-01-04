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

    var onClick = this.props.addPokemon;
    var buttonsList = pokemon.map(function(pokemon) {
      return <li className="add-pokemon-list-item"><button onClick={() => onClick(pokemon.name, pokemon.id)} className={addPokemonButton}>{pokemon.name.toUpperCase()}</button></li>
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
