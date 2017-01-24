import React, { Component } from 'react';

// bootstrap imports
import { Row, Tab, Tabs, FormControl} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

// other files
import './data/const.js';
import { items, item_autocomplete, getStoneByMega } from './data/items.js';
import { getMoveByName, moves_autocomplete } from './data/moves.js';
import { pokemon_autocomplete, getPokeFromName } from './data/pokedex.js';
import { abilities } from './data/abilities.js';
import './data/datautil.js';
import Offense from './Offense.js'
import Defense from './Defense.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: [
        {
          species: null,
          ability: null,
          item: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          item: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          item: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          item: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          item: null,
          moves: []
        },
        {
          species: null,
          ability: null,
          item: null,
          moves: []
        },
      ]
    }
  }

  updatePoke(e, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].species = getPokeFromName(e[0]);
    // set default ability
    if (newTeam[poke-1].species != null) {
      newTeam[poke-1].ability = abilities[newTeam[poke-1].species.abilities[0]];

      // if pokemon is mega, set stone as item
      if (getStoneByMega(newTeam[poke-1].species.species)) {
        newTeam[poke-1].item = items[getStoneByMega(newTeam[poke-1].species.species)];
      } else {
        if (newTeam[poke-1].item && newTeam[poke-1].item.megaStone)
          newTeam[poke-1].item = null;
      }
    } else {
      if (newTeam[poke-1].item && newTeam[poke-1].item.megaStone)
        newTeam[poke-1].item = null;
    }
    this.setState({team: newTeam});
  }

  updateAbility(e, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].ability = abilities[e.target.value];
    this.setState({team: newTeam});
  }

  updateItem(e, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].item = items[e[0]];
    this.setState({team: newTeam});
  }

  updateMove(e, move, poke) {
    var newTeam = this.state.team.slice(0);
    newTeam[poke-1].moves[move-1] = getMoveByName(e[0]);
    this.setState({team: newTeam});
  }

  render() {
    var updaters = {
      poke : this.updatePoke.bind(this),
      ability: this.updateAbility.bind(this),
      move : this.updateMove.bind(this),
      item : this.updateItem.bind(this),
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
          <Pokemon num="1" poke={this.state.team[0]} updaters={updaters} />
          <Pokemon num="2" poke={this.state.team[1]} updaters={updaters}  />
          <Pokemon num="3" poke={this.state.team[2]} updaters={updaters}  />
          <Pokemon num="4" poke={this.state.team[3]} updaters={updaters}  />
          <Pokemon num="5" poke={this.state.team[4]} updaters={updaters}  />
          <Pokemon num="6" poke={this.state.team[5]} updaters={updaters}  />
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
  return (
    <div className="col-md-2 pokemon" id={"pokemon"+props.num}>
      <Typeahead
        options={pokemon_autocomplete}
        placeholder={"Pokemon #"+props.num}
        onChange={(e) => props.updaters.poke(e, props.num)}
      />
      <AbilityBox num={props.num} poke={props.poke} updaters={props.updaters} />
      <br />
      <ItemBox num={props.num} poke={props.poke} updaters={props.updaters} />
      <br />
      <div className="move-container">
        <MoveBox num={props.num} move="1" updaters={props.updaters} />
        <MoveBox num={props.num} move="2" updaters={props.updaters} />
        <MoveBox num={props.num} move="3" updaters={props.updaters} />
        <MoveBox num={props.num} move="4" updaters={props.updaters} />
      </div>
    </div>
  )
}

function AbilityBox(props) {
  if (props.poke.species != null) {
    return (
      <FormControl componentClass="select" id="ability-selector-0" onChange={(e) => props.updaters.ability(e, props.num)}>
        {Object.values(props.poke.species.abilities).map((ability) =>
          <option key={ability}>{ability}</option>
        )}
      </FormControl>
    )
  } else {
    return (
      <select className="form-control" id="ability-selector-0" disabled="disabled" />
    )
  }

}

function ItemBox(props) {
  if (props.poke.item && props.poke.item.megaStone) {
    return (
      <FormControl value={props.poke.item.name} disabled/>
    )
  } else {
    return (
      <Typeahead
        options={item_autocomplete}
        placeholder={"Item"}
        value={props.poke.item}
        onChange={(e) => props.updaters.item(e, props.num)}
      />
    )
  }

}

function MoveBox(props) {
  return (
    <Typeahead
      options={moves_autocomplete}
      placeholder={"Move #" + props.move}
      onChange={(e) => props.updaters.move(e, props.move, props.num)}
    />
  )
}


export default App;
