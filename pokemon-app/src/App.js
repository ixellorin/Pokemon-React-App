import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ActiveBoard from './js/ActiveBoard';
import MyPokemon from './js/MyPokemon';
import NavBar from './js/NavBar';
import AddPokemon from './js/AddPokemon';

let listOfPokemon = require('./data/listOfPokemon.json');

class App extends Component {

  constructor(props) {
    super(props);
    const filled = Array(6).fill(null);
    fillArrayWithPokemon(filled);
    this.state = {
      pokemon: filled,
      showAddPokemonDialog: false,
    }
  }

  showAddPokemonDialog() {
    console.log("Showing add pokemon dialog");
    var addPokemonDialog = document.getElementById("add-pokemon-dialog");
    addPokemonDialog.style.display = (addPokemonDialog.style.display == "block") ? "none" : "block";
    this.setState({
      pokemon: this.state.pokemon,
      showAddPokemonDialog: !this.state.showAddPokemonDialog,
    });
  }

  render() {

    return (
      <div className="board">
        <div className="active-pokemon-container">
          <ActiveBoard pokemon={this.state.pokemon}/>
        </div>
        <div className="my-pokemon-container">
          <MyPokemon showAddPokemonDialog={() => this.showAddPokemonDialog()}/>
          <AddPokemon listOfPokemon={listOfPokemon.ListOfPokemon}/>
        </div>
      </div>
    );
  }
}

function importAll(r) {
  return r.keys().map(r);
}

function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

    while(ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if(nn) return nn;
    }

    return ax.length - bx.length;
}

var activePokemonImages = importAll(require.context('./images/pokemon/activeIcons', true, /.*\.png$/)).sort(naturalCompare);

var myPokemonImages = importAll(require.context('./images/pokemon/myPokemonIcons', true, /.*\.png$/)).sort(naturalCompare);

function fillArrayWithPokemon(array) {
  for (var i = 0; i < array.length; i++) {
    array[i] = activePokemonImages[Math.floor(Math.random() * 151)];
    }
  }


export default App;
