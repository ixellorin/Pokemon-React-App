import React from 'react';
import '../css/styles.css';
var optionsButton = require('../images/misc/expand_button.png');

class EntryOptions extends React.Component {

  constructor(props) {
      super(props);
      this.mouseIn = this.mouseIn.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
  }
  render() {

    var source = (this.props.pokemon === null) ? null : myPokemonImages[this.props.pokemon.id]

    return (
      <div className="entry-options-dialog" id="entry-options-dialog">
        <img className="entry-options-image" src={source} />
        Options
        <ul className="entry-options-list">
        <li className="entry-option" id="set-active-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.setActive(this.props.pokemon)}>Set Active
        <img id="entry-options-active-selector" className="entry-options-active-selector" src={optionsButton}/></li>
        <li className="entry-option" id="remove-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.removeActivePokemon(this.props.pokemon)}>Set Inactive
        <img id="entry-options-remove-selector" className="entry-options-remove-selector" src={optionsButton}/></li>
        <li className="entry-option" id="set-inactive-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.removePokemon(this.props.pokemon)}>Remove
        <img id="entry-options-inactive-selector" className="entry-options-inactive-selector" src={optionsButton}/></li>
        </ul>
      </div>
    );
  }

  mouseIn(e) {
    e.preventDefault();

    if (e.target.id === "set-active-option") {
      document.getElementById("entry-options-active-selector").style.visibility = "visible";
    } else if (e.target.id === "set-inactive-option") {
      document.getElementById("entry-options-inactive-selector").style.visibility = "visible";
    } else if (e.target.id === "remove-option") {
      document.getElementById("entry-options-remove-selector").style.visibility = "visible";
    }
  }

  mouseOut(e) {
    e.preventDefault();


    if (e.target.id === "set-active-option") {
      document.getElementById("entry-options-active-selector").style.visibility = "hidden";
    } else if (e.target.id === "set-inactive-option") {
      document.getElementById("entry-options-inactive-selector").style.visibility = "hidden";
    } else if (e.target.id === "remove-option") {
      document.getElementById("entry-options-remove-selector").style.visibility = "hidden";
    }
  }

}


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
  return images;
}

var myPokemonImages = importAll(require.context('../images/pokemon/myPokemonIcons', true, /.*\.png$/));

export default EntryOptions;
