import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ActiveBoard from './js/ActiveBoard';
import MyPokemon from './js/MyPokemon';
import NavBar from './js/NavBar';
import AddPokemon from './js/AddPokemon';


class App extends Component {

  constructor(props) {
    super(props);
    let listOfPokemon = initPokemonList();
    let myPokemon = initMyPokemon();
    const filled = Array(6).fill(null);
    this.addPokemon = this.addPokemon.bind(this);
    fillArrayWithPokemon(filled);

    this.state = {
      pokemon: filled,
      myPokemon: myPokemon.myPokemon,
      listOfPokemon: listOfPokemon.listOfPokemon,
      showAddPokemonDialog: false,
      activePokemonHeight: null,
      myPokemonHeight: null,
    };

    // this.updateDimensions = this.updateDimensions.bind(this);
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

  addPokemon(name, id) {
    var newList = this.state.myPokemon.slice();
    newList.push({name: name, id:id});
    this.setState({
      myPokemon: newList
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
          <ActiveBoard pokemon={this.state.pokemon} ref={ (activePokemonContainer) => this.activePokemonContainer = activePokemonContainer}/>
        </div>
        <div id="my-pokemon-container" className="my-pokemon-container"  ref={ (myPokemonContainer) => this.myPokemonContainer = myPokemonContainer}>
          <MyPokemon showAddPokemonDialog={() => this.showAddPokemonDialog()} myPokemon={this.state.myPokemon}/>
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
    localStorage.setItem('myPokemon', JSON.stringify(require('./data/myPokemon.json')));
  }
  
  return JSON.parse(localStorage.getItem('myPokemon'));
}

function initPokemonList() {
  if (localStorage.getItem('listOfPokemon') == null) {
    console.log('Fetching all pokemon...');
    localStorage.setItem('listOfPokemon', JSON.stringify(require('./data/listOfPokemon.json')));
  }

  return JSON.parse(localStorage.getItem('listOfPokemon'));
}

export default App;
