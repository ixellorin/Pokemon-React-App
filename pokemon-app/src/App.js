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
    let activePokemon = initActivePokemon();
    this.addPokemon = this.addPokemon.bind(this);
    this.removePokemon = this.removePokemon.bind(this);
    this.addActivePokemon = this.addActivePokemon.bind(this);

    this.state = {
      activePokemon: activePokemon,
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

  toggleAddPokemonDialog() {
    console.log("Showing add pokemon dialog");
    var addPokemonDialog = document.getElementById("add-pokemon-dialog");
    this.setState({
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
    }, () => {
      localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemon));
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


  isActiveFull() {

    for (var i = 0; i < this.state.activePokemon.length; i++) {
      if (this.state.myPokemon[i] == null) {
        return false;
      }
    }

    return true;

  }

  addActivePokemon(pokemon) {

    if (this.isActiveFull()) {
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

    for (var i = 0; i < this.state.activePokemon.length; i++) {
      if (pokemon == this.state.myPokemon[i]) {
        newActivePokemon[i] = null;
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
    }, () => {
      localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemon));
    });
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
          <ActiveBoard pokemon={this.state.activePokemon} ref={ (activePokemonContainer) => this.activePokemonContainer = activePokemonContainer}/>
        </div>
        <div id="my-pokemon-container" className="my-pokemon-container"  ref={ (myPokemonContainer) => this.myPokemonContainer = myPokemonContainer}>
          <MyPokemon toggleRemovePokemon={() => this.toggleRemovePokemon()} toggleAddPokemonDialog={() => this.toggleAddPokemonDialog()} removePokemon={this.removePokemon} myPokemon={this.state.myPokemon}/>
          <AddPokemon addPokemon={this.addPokemon} listOfPokemon={this.state.listOfPokemon}/>
        </div>
      </div>
    );
  }


}

function initPokemonList() {
  console.log('Fetching all pokemon...');
  var allPokemon = localStorage.getItem('listOfPokemon');
  if (allPokemon == null) {
    localStorage.setItem('listOfPokemon', JSON.stringify(require('./data/listOfPokemon.json')));
    return JSON.parse(JSON.stringify(require('./data/listOfPokemon.json')));
  } else {
    return JSON.parse(allPokemon);
  }

}

function initMyPokemon() {
  console.log('Fetching your pokemon...');
  var myPokemon = localStorage.getItem('myPokemon')
  if (myPokemon == null) {
    console.log('No data found, initializing your pokemon...');
    localStorage.setItem('myPokemon', JSON.stringify([]));
    return [];
  } else {
    let parsed = JSON.parse(myPokemon);
    console.log('Found your pokemon!');
    if (parsed.length == 0) {
      console.log('...but you don\'t have any pokemon! :(');
    }
    console.log(parsed);
    return parsed;
  }

}

function initActivePokemon() {
  console.log('Fetching your active my pokemon...');
  var activePokemon = localStorage.getItem('activePokemon');
  if (activePokemon == null) {
    console.log('No data found, initializing your active pokemon...');
    localStorage.setItem('activePokemon', JSON.stringify(Array(6).fill(null)));
    return Array(6).fill(null);
  } else {
    console.log('Found your active pokemon!');
    let parsed = JSON.parse(activePokemon);
    let empty = true;

    for (var i = 0; i < parsed.length; i++) {
      if (parsed[i] != null) {
        empty = false;
        break;
      }
    }

    if (empty) {
      console.log('but... you don\'t have any active pokemon! :(');
    }
    console.log(parsed);
    return parsed;
  }
}

export default App;
