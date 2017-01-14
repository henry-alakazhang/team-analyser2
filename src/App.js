import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './builder.css';

import {Typeahead} from 'react-bootstrap-typeahead';

import './data/const.js';
import './data/moves.js';
import './data/pokedex.js';
import './data/types.js';
import './data/abilities.js';

class App extends Component {
  updateData() {
    // do nothing right now
  }

  render() {
    return (
      <div className="container">
        <h1>
          .rtml Team Analyser
        </h1>
        <h2>
          A Pokemon Team Building and Analysis Tool
        </h2>
        <div className="row">
          <center>
            <h3>
              1. Build Team
            </h3>
          </center>
        </div>
        <div className="row team">
          <Pokemon num="1" updater={this.updateData}/>
          <Pokemon num="2" updater={this.updateData}/>
          <Pokemon num="3" updater={this.updateData}/>
          <Pokemon num="4" updater={this.updateData}/>
          <Pokemon num="5" updater={this.updateData}/>
          <Pokemon num="6" updater={this.updateData}/>
        </div>
        <div className="row">
          <hr/>
          <center>
            <h3>
              2. Analyse
            </h3>
          </center>
        </div>
        <div className="row">
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className="active"><a href="#defense" aria-controls="home" role="tab" data-toggle="tab">Defense</a></li>
            <li role="presentation"><a href="#offense" aria-controls="profile" role="tab" data-toggle="tab">Offense</a></li>
            <li role="presentation"><a href="#utility" aria-controls="messages" role="tab" data-toggle="tab">Utility</a></li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="defense">
            </div>
            <div role="tabpanel" className="tab-pane" id="offense">
            </div>
            <div role="tabpanel" className="tab-pane" id="utility">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Pokemon extends Component {
  render() {
    return (
      <div className="col-md-2 pokemon" id={"pokemon"+this.props.num}>
        <Typeahead
          options={window.pokemon_autocomplete}
          placeholder={"Pokemon #"+this.props.num}
        />
        <select className="form-control" id="ability-selector-0" disabled="disabled" />
        <br />
        <div className="move-container">
          <Move poke={this.props.num} num="1" />
          <Move poke={this.props.num} num="2" />
          <Move poke={this.props.num} num="3" />
          <Move poke={this.props.num} num="4" />
        </div>
      </div>
    )
  }
}

class Move extends Component {
  render() {
    return (
      <input className="move form-control ui-autocomplete-input" placeholder={"Move #" + this.props.num} id={this.props.poke +"-move-"+ this.props.num} />
    )
  }
}


export default App;
