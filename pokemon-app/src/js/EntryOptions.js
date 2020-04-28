import React from 'react';
import SwapOption from './SwapOption';
import '../css/styles.css';
var optionsButton = require('../images/misc/expand_button.png');

class EntryOptions extends React.Component {

  constructor(props) {
      super(props);
      this.mouseIn = this.mouseIn.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
      this.swapPokemon = this.swapPokemon.bind(this)
      console.log(this.props.swapPokemon)
  }
  render() {
    var source = (this.props.pokemon === null) ? null : myPokemonImages[this.props.pokemon.id]

    if (!this.props.isSwapping) {
      return (
        <div className="entry-options-dialog" id="entry-options-dialog">
          <img className="entry-options-image" src={source} />
          <span className="entry-options-header-text">{this.props.pokemon ? this.props.pokemon.name : ''}</span>
          <ul className="entry-options-list">
            <li className="entry-option" id="set-active-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.setActive(this.props.pokemon)}>Set Active
              <img id="entry-options-active-selector" className="entry-options-selector" src={optionsButton}/></li>
            <li className="entry-option" id="remove-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.removeActivePokemon(this.props.pokemon)}>Set Inactive
              <img id="entry-options-remove-selector" className="entry-options-selector" src={optionsButton}/></li>
            <li className="entry-option" id="set-inactive-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.removePokemon(this.props.pokemon)}>Remove
              <img id="entry-options-inactive-selector" className="entry-options-selector" src={optionsButton}/></li>
            <li className="entry-option" id="swap-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.toggleSwap()}>Switch
              <img id="entry-options-swap-selector" className="entry-options-selector" src={optionsButton}/></li>
          </ul>
        </div>
      );
    } else {
      let me = this;
      let buttonsList = []
      console.log(this.props.pokemon)
      if (this.props.pokemon !== null && this.props.pokemon.isActive) {
        buttonsList =
          buttonsList = this.props.myPokemon.filter((pokemon) => {
            return pokemon !== null && !pokemon.isActive
          }).map(function(pokemon) {
            return <SwapOption toggleSwap={me.props.toggleSwap} pokemon={pokemon} oldPokemon={me.props.pokemon} swapPokemon={me.swapPokemon}/>
          });
      } else {
        buttonsList = this.props.activePokemon.filter((pokemon) => {
          return pokemon !== null && pokemon.isActive
        }).map(function(pokemon) {
          return <SwapOption toggleSwap={me.props.toggleSwap} pokemon={pokemon} oldPokemon={me.props.pokemon} swapPokemon={me.swapPokemon}/>
        });
      }

      return(
        <div className="entry-options-dialog" id="entry-options-dialog">
          <div className="entry-options-header">
            <img className="entry-options-image" src={source} />
            <span className="entry-options-header-text">Switch with...</span>
          </div>
          <div className="swap-pokemon-list">
            {buttonsList}
          </div>
          <ul className="entry-options-list">
            <li className="entry-option" id="back-option" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} onClick={() => this.props.toggleSwap()}>Back
              <img id="back-selector" className="entry-options-selector" src={optionsButton}/></li>
          </ul>
        </div>
      );
    }

  }

  swapPokemon(oldPokemon, newPokemon) {
    console.log(oldPokemon, newPokemon)
    this.props.swapPokemon(oldPokemon, newPokemon)
  }

  mouseIn(e) {
    e.preventDefault();

    if (e.target.id === "set-active-option") {
      document.getElementById("entry-options-active-selector").style.visibility = "visible";
    } else if (e.target.id === "set-inactive-option") {
      document.getElementById("entry-options-inactive-selector").style.visibility = "visible";
    } else if (e.target.id === "remove-option") {
      document.getElementById("entry-options-remove-selector").style.visibility = "visible";
    } else if (e.target.id === "swap-option") {
      document.getElementById("entry-options-swap-selector").style.visibility = "visible";
    } else if (e.target.id === "back-option") {
      document.getElementById("back-selector").style.visibility = "visible";
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
    } else if (e.target.id === "swap-option") {
      document.getElementById("entry-options-swap-selector").style.visibility = "hidden";
    } else if (e.target.id === "back-option") {
      document.getElementById("back-selector").style.visibility = "hidden";
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
