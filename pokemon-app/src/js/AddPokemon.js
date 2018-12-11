import React, { Component } from 'react';
import '../css/styles.css';

// var images = require.context('../images/pokemon', true, /.*\.png$/);

class AddPokemon extends React.Component {

  render() {
    return (
      <div className="add-pokemon">
        <h1>Add Pokemon</h1>
      </div>
    );
  }
}

export default AddPokemon;
