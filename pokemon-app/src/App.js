import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ActiveBoard from './js/ActiveBoard';
import MyPokemon from './js/MyPokemon';
import NavBar from './js/NavBar';
import AddPokemon from './js/AddPokemon';
import Pokemon from './js/Pokemon';

class App extends Component {

  constructor(props) {

    super(props);
    let listOfPokemon = initPokemonList();
    let myPokemon = initMyPokemon();
    const filled = Array(6).fill(null);
    this.addPokemon = this.addPokemon.bind(this);
    this.removePokemon = this.removePokemon.bind(this);
    this.addActivePokemon = this.addActivePokemon.bind(this);
    fillArrayWithPokemon(filled);

    this.state = {
      pokemon: filled,
      myPokemon: myPokemon,
      listOfPokemon: listOfPokemon.listOfPokemon,
      activePokemon: [],
      showAddPokemonDialog: false,
      removePokemonEnabled: false,
      // activePokemonHeight: null,
      // myPokemonHeight: null,
    };

    // this.updateDimensions = this.updateDimensions.bind(this);
  }

  showAddPokemonDialog() {
    console.log("Showing add pokemon dialog");
    var addPokemonDialog = document.getElementById("add-pokemon-dialog");
    this.setState({
      pokemon: this.state.pokemon,
      showAddPokemonDialog: !this.state.showAddPokemonDialog,
    }, () => {
      addPokemonDialog.style.display = this.state.showAddPokemonDialog ? "block" : "none";
    });

  }

  addPokemon(name, id) {
    var newList = this.state.myPokemon.slice();
    newList.push(new Pokemon(name, id));
    this.setState({
      myPokemon: newList
    });
  }

  toggleRemovePokemon() {
    console.log("Enabling remove pokemon");

    this.setState({
      removePokemonEnabled: !this.state.removePokemonEnabled,
    }, () => {
      var removePokemonButtons = document.getElementsByClassName("remove-entry-button");

      if (removePokemonButtons !== null) {
        for (let button of removePokemonButtons) {
          // console.log(this.state.removePokemonEnabled);
          button.style.display = (this.state.removePokemonEnabled) ? "inline" : "none";
          // console.log(button.style.display);
        }
      }
    });

  }

  addActivePokemon(pokemon) {

    if (this.state.activePokemon.length == 6) {
      return;
    } else {
      var newActivePokemon = this.state.activePokemon.slice();
      this.setState({
        activePokemon: newActivePokemon,
      }, () => {
        pokemon.setActive();
      });
    }

  }

  removeActivePokemon(pokemon) {
    var newActivePokemon = this.state.activePokemon.slice();

    for (var i = 0; i < this.state.newActivePokemon.length; i++) {
      if (pokemon == this.state.myPokemon[i]) {
        newActivePokemon.splice(i, 1);
        break;
      }
    }

    this.setState({
      activePokemon: newActivePokemon,
    }, () => {
      pokemon.setInactive();
    });
  }

  removePokemon(pokemon) {

    var newList = this.state.myPokemon.slice();
    console.log(pokemon);
    for (var i = 0; i < this.state.myPokemon.length; i++) {
      if (pokemon == this.state.myPokemon[i]) {
        console.log(this.state.myPokemon[i]);
        newList.splice(i, 1);
        break;
      }
    }

    console.log('pokemon removed');
    console.log(newList);
    this.setState({
      myPokemon: newList
    })
  }

  // componentDidMount() {
  //   // Additionally I could have just used an arrow function for the binding `this` to the component...
  //   window.addEventListener("resize", this.updateDimensions);
  // }
  //
  // updateDimensions() {
  //   document.getElementById("my-pokemon-container").style.maxHeight = document.getElementById("grid").style.maxHeight;
  //
  //   console.log(document.getElementById("my-pokemon-container").style);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }

  render() {

    return (
      <div className="board">
        <div id="active-pokemon-container" className="active-pokemon-container">
          <ActiveBoard pokemon={this.state.pokemon} ref={ (activePokemonContainer) => this.activePokemonContainer = activePokemonContainer}/>
        </div>
        <div id="my-pokemon-container" className="my-pokemon-container"  ref={ (myPokemonContainer) => this.myPokemonContainer = myPokemonContainer}>
          <MyPokemon toggleRemovePokemon={() => this.toggleRemovePokemon()} showAddPokemonDialog={() => this.showAddPokemonDialog()} removePokemon={this.removePokemon} myPokemon={this.state.myPokemon}/>
          <AddPokemon addPokemon={this.addPokemon} listOfPokemon={this.state.listOfPokemon}/>
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

function initMyPokemon() {
  if (localStorage.getItem('myPokemon') == null) {
    console.log('Fetching my pokemon...');
    localStorage.setItem('myPokemon', []);
  }

  return [];
}

function initPokemonList() {
  if (localStorage.getItem('listOfPokemon') == null) {
    console.log('Fetching all pokemon...');
    localStorage.setItem('listOfPokemon', JSON.stringify(require('./data/listOfPokemon.json')));
  }

  return JSON.parse(localStorage.getItem('listOfPokemon'));
}

export default App;
