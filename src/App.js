import React, { Component } from 'react';

// bootstrap imports
import { Row, Tab, Tabs, FormControl} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

// other files
import Offense from './Offense.js'
import Defense from './Defense.js'
import './data/const.js';
import './data/moves.js';
import './data/types.js';
import './data/pokedex.js';
import './data/abilities.js';
import './data/datautil.js';

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
          ability: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          moves: []
        },
      ]
    }
  }

  updatePoke(e, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].species = window.getPokeFromName(e[0]);
    if (newTeam[poke-1].species != null)
      // set default ability
      newTeam[poke-1].ability = newTeam[poke-1].species.abilities[0];
    this.setState({team: newTeam});
  }

  updateAbility(e, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].ability = e.target.value;
    this.setState({team: newTeam});
  }

  updateMove(e, move, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].moves[move-1] = window.getMoveByName(e[0]);
    this.setState({team: newTeam});
  }

  render() {
    var updaters = {
      poke : this.updatePoke.bind(this),
      ability: this.updateAbility.bind(this),
      move : this.updateMove.bind(this),
    };

    return (
      <div className="container">
        <h1>
          .rtml Team Analyser
        </h1>
        <h2>
          A Pokemon Team Building and Analysis Tool
        </h2>
        <hr/>
        <Row>
          <center>
            <h3>
              1. Build Team
            </h3>
          </center>
        </Row>
        <Row bsClass="row team">
          <Pokemon num="1" poke={this.state.team[0].species} updaters={updaters} />
          <Pokemon num="2" poke={this.state.team[1].species} updaters={updaters}  />
          <Pokemon num="3" poke={this.state.team[2].species} updaters={updaters}  />
          <Pokemon num="4" poke={this.state.team[3].species} updaters={updaters}  />
          <Pokemon num="5" poke={this.state.team[4].species} updaters={updaters}  />
          <Pokemon num="6" poke={this.state.team[5].species} updaters={updaters}  />
        </Row>
        <Row>
          <hr/>
          <center>
            <h3>
              2. Analyse
            </h3>
          </center>
        </Row>
        <Row>
        </Row>
        <Row>
          <Tabs defaultActiveKey={1} animation={false} id="analytic-tabs">
            <Tab eventKey={1} title="Defense">
              <Defense team={this.state.team} />
            </Tab>
            <Tab eventKey={2} title="Offense">
              <Offense team={this.state.team} />
            </Tab>
            <Tab eventKey={3} title="Utility">
            </Tab>
          </Tabs>
        </Row>
      </div>
    );
  }
}

function Pokemon(props) {
  var abilitybox;
  if (props.poke != null) {
    abilitybox = (
      <FormControl componentClass="select" id="ability-selector-0" onChange={(e) => props.updaters.ability(e, props.num)}>
        {Object.values(props.poke.abilities).map((ability) =>
          <option key={ability}>{ability}</option>
        )}
      </FormControl>
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
        onChange={(e) => props.updaters.poke(e, props.num)}
      />
      {abilitybox}
      <br />
      <div className="move-container">
        <Move poke={props.num} num="1" updaters={props.updaters} />
        <Move poke={props.num} num="2" updaters={props.updaters} />
        <Move poke={props.num} num="3" updaters={props.updaters} />
        <Move poke={props.num} num="4" updaters={props.updaters} />
      </div>
    </div>
  )
}

function Move(props) {
  return (
    <Typeahead
      options={window.moves_autocomplete}
      placeholder={"Move #" + props.num}
      onChange={(e) => props.updaters.move(e, props.num, props.poke)}
    />
  )
}


export default App;
