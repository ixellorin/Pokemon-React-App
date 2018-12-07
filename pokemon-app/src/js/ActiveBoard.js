import React, { Component } from 'react';
import '../css/styles.css';

// var images = require.context('../images/pokemon', true, /.*\.png$/);

function importAll(r) {
  console.log(r.keys());
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

var images = importAll(require.context('../images/pokemon', true, /.*\.png$/));

images.sort(naturalCompare);

class ActiveBoard extends React.Component {

  constructor(props) {
  super(props);

}

  render() {
    console.log(images);
    return (
      <div className="grid">

        <div className="grid-row">
          <div className="grid-column top left">
              <img className="grid-image" src={images[0]} />
          </div>
          <div className="grid-column top middle">
              <img className="grid-image" src={images[0]} />
          </div>
          <div className="grid-column top right">
              <img className="grid-image" src={images[0]} />
          </div>
        </div>

        <div className="grid-row">
          <div className="grid-column bottom left">
              <img className="grid-image" src={images[0]} />
          </div>
          <div className="grid-column bottom middle">
              <img className="grid-image" src={images[0]} />
          </div>
          <div className="grid-column bottom right">
              <img className="grid-image" src={images[0]} />
          </div>
        </div>

      </div>
    );
  }
}

export default ActiveBoard;
