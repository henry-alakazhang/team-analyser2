import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './builder.css';

import {Typeahead} from 'react-bootstrap-typeahead';
import Defense from './defense.js'

import './data/const.js';
import './data/moves.js';
import './data/pokedex.js';
import './data/types.js';
import './data/abilities.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: [
        {
          species: null,
          ability: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          moves: []
        },
        {
          species: null,
          abilitiy: null,
          moves: []
        },
        {
          species: null,
          abilitiy: null,
          moves: []
        },
        {
          species: null,
          abilitiy: null,
          moves: []
        },
        {
          species: null,
          abilitiy: null,
          moves: []
        },
      ],
      defensematrix : null,
      offensematrix : null,
    }
  }

  updatePoke(e, poke) {
    console.log(poke);
    console.log(this);
    var newTeam = this.state.team.splice(0);
    newTeam[poke-1]['species'] = window.getPokeFromName(e[0]);
    this.setState({team: newTeam});
  }

  updateData(e) {

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
          <Pokemon num="1" poke={this.state.team[0].species} pupdater={this.updatePoke.bind(this)} mupdater={this.updateData} />
          <Pokemon num="2" poke={this.state.team[1].species} pupdater={this.updatePoke.bind(this)} mupdater={this.updateData} />
          <Pokemon num="3" poke={this.state.team[2].species} pupdater={this.updatePoke.bind(this)} mupdater={this.updateData} />
          <Pokemon num="4" poke={this.state.team[3].species} pupdater={this.updatePoke.bind(this)} mupdater={this.updateData} />
          <Pokemon num="5" poke={this.state.team[4].species} pupdater={this.updatePoke.bind(this)} mupdater={this.updateData} />
          <Pokemon num="6" poke={this.state.team[5].species} pupdater={this.updatePoke.bind(this)} mupdater={this.updateData} />
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
              <Defense team={this.state.team} />
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

function Pokemon(props) {
  var abilitybox;
  if (props.poke != null) {
    abilitybox = (
      <select className="form-control" id="ability-selector-0">
        {Object.values(props.poke.abilities).map((ability) =>
          <option>{ability}</option>
        )}
      </select>
    )
  } else {
    abilitybox = (
      <select className="form-control" id="ability-selector-0" disabled="disabled" />
    )
  }

  return (
    <div className="col-md-2 pokemon" id={"pokemon"+props.num}>
      <Typeahead
        options={window.pokemon_autocomplete}
        placeholder={"Pokemon #"+props.num}
        onChange={(e) => props.pupdater(e, props.num)}
      />
      {abilitybox}
      <br />
      <div className="move-container">
        <Move poke={props.num} num="1" updater={props.mupdater} />
        <Move poke={props.num} num="2" updater={props.mupdater} />
        <Move poke={props.num} num="3" updater={props.mupdater} />
        <Move poke={props.num} num="4" updater={props.mupdater} />
      </div>
    </div>
  )
}

function Move(props) {
  return (
    <Typeahead
      options={window.moves_autocomplete}
      placeholder={"Move #" + props.num}
      onChange={(e) => props.updater(e)}
    />
  )
}


export default App;
