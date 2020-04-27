import React from 'react';
var optionsButton = require('../images/misc/expand_button.png');

class MyPokemonEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="my-pokemon-entry">
      <img className="my-pokemon-entry-image" src={myPokemonImages[this.props.pokemon.id]} />
          <span className="my-pokemon-entry-text">
            {this.props.pokemon.name.toUpperCase()}
          </span>
        <img className="entry-options-button" onClick={(e) => this.props.toggleEntryOptions(this.props.pokemon, e)} src={optionsButton}/>
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
