import React, { Component } from 'react';
import AddPokemon from './AddPokemon';
import MyPokemonEntry from './MyPokemonEntry';
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


class MyPokemon extends React.Component {

  render() {
    var myPokemon = this.props.myPokemon;
    var onClick = this.props.removePokemon;
    var buttonsList = myPokemon.map(function(pokemon, index) {
      return <MyPokemonEntry id={pokemon.id} name={pokemon.name} index={pokemon.index} removePokemon={onClick}/>
    });

    return (
        <div className="my-pokemon">
          <h1>My Pokemon</h1>
          <div className="my-pokemon-list">
            {buttonsList}
          </div>
          <div className="my-pokemon-buttons-container">
            <button className={addPokemonButton} onClick={this.props.showAddPokemonDialog}>Add +</button>
            <button className={removePokemonButton} onClick={this.props.toggleRemovePokemon}>Remove +</button>
          </div>
        </div>
      );
  }
}

export default MyPokemon;
