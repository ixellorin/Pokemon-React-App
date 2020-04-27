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
      return <button onClick={() => onClick(pokemon.name, pokemon.id)} className={addPokemonButton}>
          <img className="add-pokemon-entry-image" src={myPokemonImages[pokemon.id]} />
            <span className="add-pokemon-entry-text">
              {pokemon.name.toUpperCase()}
            </span>
          </button>
    })

    return (
      <div className="add-pokemon-dialog" id="add-pokemon-dialog">
      <div className="add-pokemon-header">
        <h3 className="add-pokemon-header">ADD POK&eacute;MON</h3>
      </div>
        <ul className="add-pokemon-list">
          {buttonsList}
        </ul>
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

export default AddPokemon;
