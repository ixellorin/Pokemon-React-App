import React, { Component } from 'react';
import '../css/styles.css';
import classNames from 'classnames';

var addPokemonButton = classNames({
  'add-pokemon-list-button': true,
  'button': true
});

// var images = require.context('../images/pokemon', true, /.*\.png$/);


class EntryOptions extends React.Component {

  constructor(props) {
      super(props);
  }
  render() {

    var source = (this.props.pokemon == null) ? null : myPokemonImages[this.props.pokemon.id]

    return (
      <div className="entry-options-dialog" id="entry-options-dialog">
        <img className="entry-options-image" src={source} />
        <h4 className="entry-options-header">Options</h4>
        <ul className="entry-options-list">
        <li>Set Active</li>
        <li>Remove</li>
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

export default EntryOptions;
