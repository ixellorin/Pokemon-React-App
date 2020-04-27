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

class MyPokemon extends React.Component {

  render() {
    var myPokemon = this.props.myPokemon;
    var onClick = this.props.removePokemon;
    var toggleEntryOptions = this.props.toggleEntryOptions;
    var buttonsList = myPokemon.map(function(pokemon) {
      return <MyPokemonEntry toggleEntryOptions={toggleEntryOptions} pokemon={pokemon} removePokemon={onClick}/>
    });

    return (
        <div className="my-pokemon">
          <div className="my-pokemon-header">
            <h2 className="my-pokemon-header">MY POK&eacute;MON</h2>
          </div>
          <div className="my-pokemon-list">
            {buttonsList}
          </div>
          <div className="my-pokemon-buttons-container">
            <button className={addPokemonButton} onClick={this.props.toggleAddPokemonDialog}>Add &#43;</button>
          </div>
        </div>
      );
  }
}

export default MyPokemon;
