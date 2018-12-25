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

    return (
      <div className="entry-options-dialog" id="entry-options-dialog">
        <h1>Options</h1>
        <ul className="entry-options-list">
        <li>Set Active</li>
        <li>Remove</li>
        </ul>
      </div>
    );
  }
}

export default EntryOptions;
