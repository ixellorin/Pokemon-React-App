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

  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className="my-pokemon">
          <h1>My Pokemon</h1>
            <MyPokemonEntry name="Chansey"/>
            <MyPokemonEntry name="Dodrio"/>
            <MyPokemonEntry name="Lapras"/>
            <MyPokemonEntry name="Nidoran"/>
            <MyPokemonEntry name="Spearow"/>
            <MyPokemonEntry name="Clefable"/>
          <div className="my-pokemon-buttons-container">
            <button className={addPokemonButton} onClick={this.props.showAddPokemonDialog}>Add +</button>
            <button className={removePokemonButton}>Remove +</button>
          </div>
        </div>
      );
  }
}

export default MyPokemon;
