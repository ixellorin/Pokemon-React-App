import React from 'react';
import '../css/styles.css';
var optionsButton = require('../images/misc/expand_button.png');

class SwapOption extends React.Component {

  constructor(props) {
      super(props);
  }
  render() {
    let me = this;
    let onClick = this.props.swapPokemon
    var source = (this.props.pokemon === null) ? null : myPokemonImages[this.props.pokemon.id]
    console.log(this.props)

    return (
      <div className="my-pokemon-entry" onClick={(e) => onClick(me.props.oldPokemon, me.props.pokemon)}>
      <img className="my-pokemon-entry-image" src={myPokemonImages[this.props.pokemon.id]} />
          <span className="my-pokemon-entry-text">
            {this.props.pokemon.name.toUpperCase()}
          </span>
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

export default SwapOption;
