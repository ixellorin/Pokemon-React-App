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
      this.handleChange = this.handleChange.bind(this);
      this.state = {
          filtered: props.listOfPokemon
      }
  }

  handleChange(e) {
          // Variable to hold the original version of the list
      let currentList = [];
          // Variable to hold the filtered list before putting into state
      let newList = [];

          // If the search bar isn't empty
      if (e.target.value !== "") {
              // Assign the original list to currentList
        currentList = this.props.listOfPokemon;

              // Use .filter() to determine which items should be displayed
              // based on the search terms
        newList = currentList.filter(item => {
                  // change current item to lowercase
          const lc = item.name.toLowerCase();
                  // change search term to lowercase
          const filter = e.target.value.toLowerCase();
                  // check to see if the current list item includes the search term
                  // If it does, it will be added to newList. Using lowercase eliminates
                  // issues with capitalization in search terms and search content
          return lc.includes(filter);
        });
      } else {
              // If the search bar is empty, set newList to original task list
        newList = this.props.listOfPokemon;
      }
          // Set the filtered state based on what our rules added to newList
      this.setState({
        filtered: newList
      });
    }

  render() {

    var onClick = this.props.addPokemon;
    var buttonsList = this.state.filtered.map(function(pokemon) {
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
      <div className="search-container">
        <input type="text" className="add-input" onChange={this.handleChange} placeholder="Search..." />
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
