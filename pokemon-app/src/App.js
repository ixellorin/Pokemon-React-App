import React, { Component } from 'react';
import './App.css';
import ActiveBoard from './js/ActiveBoard';
import MyPokemon from './js/MyPokemon';
import EntryOptions from './js/EntryOptions';
import AddPokemon from './js/AddPokemon';
import Pokemon from './js/Pokemon';

var optionsButton = require('./images/misc/expand_button.png');
var optionsButtonActive = require('./images/misc/expand_button_active.png');

class App extends Component {

  constructor(props) {
    super(props);
    let listOfPokemon = initPokemonList();
    let myPokemon = initMyPokemon();
    let activePokemon = initActivePokemon(myPokemon);

    this.addPokemon = this.addPokemon.bind(this);
    this.removePokemon = this.removePokemon.bind(this);

    this.toggleEntryOptions = this.toggleEntryOptions.bind(this);
    this.addActivePokemon = this.addActivePokemon.bind(this);
    this.removeActivePokemon = this.removeActivePokemon.bind(this);
    this.finishOptions = this.finishOptions.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.toggleSwap = this.toggleSwap.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.state = {
      activePokemon: activePokemon,
      myPokemon: myPokemon,
      listOfPokemon: listOfPokemon.listOfPokemon,
      showAddPokemonDialog: false,
      currentPokemonForOptions: null,
      showEntryOptionsDialog: false,
      isSwapping: false,
      // activePokemonHeight: null,
      // myPokemonHeight: null,
    };
    // this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {

    return (
      <div className="board">
        <div id="active-pokemon-container" className="active-pokemon-container">
          <ActiveBoard pokemon={this.state.activePokemon} onClick={this.toggleEntryOptions} ref={ (activePokemonContainer) => this.activePokemonContainer = activePokemonContainer}/>
        </div>
        <div id="my-pokemon-container" className="my-pokemon-container"  ref={ (myPokemonContainer) => this.myPokemonContainer = myPokemonContainer}>
          <MyPokemon toggleAddPokemonDialog={() => this.toggleAddPokemonDialog()} removePokemon={this.removePokemon} toggleEntryOptions={this.toggleEntryOptions} myPokemon={this.state.myPokemon}/>
          <EntryOptions removePokemon={this.removePokemon} setActive={this.addActivePokemon} activePokemon={this.state.activePokemon}   myPokemon={this.state.myPokemon} removeActivePokemon={this.removeActivePokemon} pokemon={this.state.currentPokemonForOptions} isSwapping={this.state.isSwapping} toggleSwap={this.toggleSwap} swapPokemon={this.handleSwap}/>
          <AddPokemon addPokemon={this.addPokemon} listOfPokemon={this.state.listOfPokemon}/>
        </div>
      </div>
    );
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


  isActiveFull() {

    for (var i = 0; i < this.state.activePokemon.length; i++) {
      if (this.state.activePokemon[i] === null) {
        return false;
      }
    }

    return true;

  }

  pokemonAlreadyActive(pokemon) {
    for (var i = 0; i < this.state.activePokemon.length; i++) {
      if (pokemon === this.state.activePokemon[i]) {
        return true;
      }
    }
    return false;
  }

  addActivePokemon(pokemon) {
    console.log("Attempting to set " + pokemon.name + " as active...")
    if (this.isActiveFull()) {
      console.log("You already have 6 pokemon active...");
      return;
    } else if (this.pokemonAlreadyActive(pokemon)) {
      console.log(pokemon.name + " is already active");
    } else {
      pokemon.isActive = true;
      var newActivePokemon = this.state.activePokemon.slice();
      newActivePokemon = this.insertAtFirstNull(pokemon, newActivePokemon);
      console.log(newActivePokemon)
      this.setState({
        activePokemon: newActivePokemon,
      }, () => {
        this.finishOptions();
        localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemon));
        console.log("added " + pokemon.name + " to active roster...")
      });
    }

  }

  insertAtFirstNull(obj, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === null) {
        array[i] = obj;
        return array;
      }
    }
    return array;
  }

  removeActivePokemon(pokemon) {
    console.log("Attempting to remove " + pokemon.name + " from the active roster...");

    var newActivePokemon = this.state.activePokemon.slice();
    var removeSuccessful = false;
    for (var i = 0; i < this.state.activePokemon.length; i++) {
      if (pokemon == this.state.activePokemon[i]) {
        newActivePokemon[i] = null;
        removeSuccessful = true;
        this.finishOptions();
        break;
      }
    }

    this.setState({
      activePokemon: newActivePokemon,
    }, () => {
      pokemon.isActive = false;
      localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemon));
      console.log(removeSuccessful ? "Removed " + pokemon.name + " from the active roster..." : pokemon.name + " is already inactive");
    });
  }

  toggleSwap() {
    let me = this.state.isSwapping
    this.setState({
      isSwapping: !me,
    }, () => {
      console.log(this.state.isSwapping)
      return true;
    })
  }

  async handleSwap(pokemon1, pokemon2) {
    console.log(pokemon1.name, pokemon2.name)
    if (pokemon1.isActive) {
      await this.removeActivePokemon(pokemon1)
      await this.addActivePokemon(pokemon2)
    } else {
      await this.removeActivePokemon(pokemon2)
      await this.addActivePokemon(pokemon1)
    }
  }

  removePokemon(pokemon) {
    if (pokemon.isActive) {
      this.removeActivePokemon(pokemon);
    }
    var newList = this.state.myPokemon.slice();
    for (var i = 0; i < this.state.myPokemon.length; i++) {
      if (pokemon === this.state.myPokemon[i]) {
        console.log(this.state.myPokemon[i]);
        newList.splice(i, 1);
        console.log(pokemon.isActive);
        break;
      }
    }

    console.log('pokemon removed');
    console.log(newList);
    this.setState({
      myPokemon: newList
    }, () => {
      this.finishOptions();
      localStorage.setItem('myPokemon', JSON.stringify(this.state.myPokemon));
    });


  }

  toggleEntryOptions(pokemon, e) {
    e.preventDefault();
    var anchor= e.target.getBoundingClientRect();
    var target = e.target;
    if (pokemon === this.state.currentPokemonForOptions || this.state.currentPokemonForOptions === null) {
      var entryOptionsDialog = document.getElementById("entry-options-dialog");
      this.setState({
        isSwapping: false
      }, () => {
          this.setState({
          showEntryOptionsDialog: !this.state.showEntryOptionsDialog,
          currentPokemonForOptions: pokemon,
        }, () => {
          if (this.state.showEntryOptionsDialog) {
              console.log("Opening entry options...");

              entryOptionsDialog.style.display = "block";

              if (target.className === "entry-options-button") {
                target.src = optionsButtonActive;
              }

              entryOptionsDialog.style.top = (anchor.y - 10).toString() + "px";
          } else {
              console.log("Closing entry options...");
              entryOptionsDialog.style.display = "none";

              if (target.className === "entry-options-button") {
                target.src = optionsButton;
              }

              this.setState({
                currentPokemonForOptions: null,
              }, () => {
                return true;
              });
          }
        });
      });
    }
  }

  finishOptions() {
    this.setState({
      showEntryOptionsDialog: !this.state.showEntryOptionsDialog,
      currentPokemonForOptions: null,
    }, () => {
      var optionsButtons = document.getElementsByClassName("entry-options-button");
      for (let button of optionsButtons) {
        button.src = optionsButton;
      }
      var entryOptionsDialog = document.getElementById("entry-options-dialog");
      entryOptionsDialog.style.display = "none";
      return true;
    });
  }

  handleKeyPress(event) {
    if (event.keyCode == 27) {
      if (this.state.showEntryOptionsDialog) {
        this.toggleEntryOptions(this.state.currentPokemonForOptions, event)
        let optionsButtons = document.getElementsByClassName("entry-options-button")
        for (let i = 0; i < optionsButtons.length; i++) {
            optionsButtons[i].src = optionsButton;
          }
      }
      if (this.state.showAddPokemonDialog) {
        this.toggleAddPokemonDialog()
      }
    }
  }
}

function initPokemonList() {
  console.log('Fetching all pokemon...');
  var allPokemon = localStorage.getItem('listOfPokemon');
  if (allPokemon === null) {
    localStorage.setItem('listOfPokemon', JSON.stringify(require('./data/listOfPokemon.json')));
    return JSON.parse(JSON.stringify(require('./data/listOfPokemon.json')));
  } else {
    return JSON.parse(allPokemon);
  }

}

function initMyPokemon() {
  console.log('Fetching your pokemon...');
  var myPokemon = localStorage.getItem('myPokemon')
  if (myPokemon === null) {
    console.log('No data found, initializing your pokemon...');
    localStorage.setItem('myPokemon', JSON.stringify([]));
    return [];
  } else {
    let parsed = JSON.parse(myPokemon);
    console.log('Found your pokemon!');
    if (parsed.length === 0) {
      console.log('...but you don\'t have any pokemon! :(');
    }
    console.log(parsed);
    return parsed;
  }

}

function initActivePokemon(myPokemon) {
  console.log(myPokemon);
  console.log('Fetching your active my pokemon...');
  let activePokemon = [];
  for (var i = 0; i < myPokemon.length; i++) {
    if (myPokemon[i].isActive) {
      console.log(myPokemon[i]);
      activePokemon.push(myPokemon[i]);
    }
  }

  for (var m = activePokemon.length; m < 6; m++) {
    activePokemon.push(null);
    console.log(activePokemon);
  }
  return activePokemon;
}

export default App;
