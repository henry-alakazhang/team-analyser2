import React, { Component } from 'react';

// bootstrap imports
import { Row, Tab, Tabs, FormControl, Col, Button, Modal, FormGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Toggle from 'react-bootstrap-toggle';

// other files
import { items, item_autocomplete, getStoneByMega } from './data/items.js';
import { getMoveByName, moves_autocomplete } from './data/moves.js';
import { pokemon_autocomplete, getPokeFromName } from './data/pokedex.js';
import { abilities } from './data/abilities.js';
import { HorizontalInputComponent } from './General.js';
import Offense from './Offense.js';
import Defense from './Defense.js';

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
      ],
      adv : false,
      textForm : false,
    }
  }

  openExporter(e) {
    this.setState({textForm : true});
  }

  closeExporter(e) {
    this.setState({textForm : false});
  }

  updateTeamFromExporter(newTeam) {
    this.setState({team : convertTextToTeam(newTeam)});
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

  toggleAdvanced(e) {
    this.setState({adv : !this.state.adv});
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
        <center>
          <Row>
            or
          </Row>
          <Row>
            <Button bsStyle="primary" bsSize="large" onClick={this.openExporter.bind(this)}>
              Import/Export Team
            </Button>
          </Row>
        </center>
        <TeamImportForm show={this.state.textForm}
          team={convertTeamToText(this.state.team)}
          onClose={this.closeExporter.bind(this)}
          update={this.updateTeamFromExporter.bind(this)}
        />
        <Row>
          <hr/>
          <center>
            <div><h3>
              2. Analyse
            </h3></div>
            <Col md={2} style={{float:'right'}}>
              <HorizontalInputComponent
                label="Advanced analysis:"
                input={(<Toggle
                  onClick={this.toggleAdvanced.bind(this)}
                  off="Off"
                  on="On"
                  offStyle="info"
                  active={this.state.adv}
                />)}
                ratio={6}
              />
            </Col>
          </center>
        </Row>
        <Row>
        </Row>
        <Row>
          <Tabs defaultActiveKey={1} animation={false} id="analytic-tabs">
            <Tab eventKey={1} title="Defense">
              <Defense team={this.state.team} adv={this.state.adv} />
            </Tab>
            <Tab eventKey={2} title="Offense">
              <Offense team={this.state.team} adv={this.state.adv} />
            </Tab>
          </Tabs>
        </Row>
      </div>
    );
  }
}

class TeamImportForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
   this.props.update(this.input.value);
   this.props.onClose();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import/Export Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Import a team from Pokemon Showdown
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <textarea
                className="form-control"
                defaultValue={this.props.team}
                ref={(input) => this.input = input}
                rows={30}
              />
              <Button bsStyle="primary" type="submit">
                Import
              </Button>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

/*
 * Converts a team to Smogon-style text form
 * Should be importable straight into Pokemon Showdown
 */
function convertTeamToText(team) {
  var teamText = "";
  for (var i = 0; i < team.length; i++) {
    if (team[i].species == null)
      continue;
    teamText += team[i].species.species;
    if (team[i].item)
      teamText += " @ " + team[i].item.name;
    teamText += "\n";
    teamText += "Ability: " + team[i].ability.name + "\n";
    for (var m = 0; m < team[i].moves.length; m++) {
      if (team[i].moves[m])
        teamText += "- " + team[i].moves[m].name + "\n";
    }
    teamText += "\n";
  }
  return teamText;
}

/*
 * Converts a Smogon-style text form into a team
 * Should be able to import straight off Showdown, but don't make any funny nicknames
 * Algorithm (appropriated from|inspired by) the actual Showdown client GH.
 */
function convertTextToTeam(text) {
  var team = [
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
  ];
  text = text.split("\n");
  var member = 0;
  var find = true;
  for (var i = 0; i < text.length; i++) {
    var line = text[i].trim();
    if (line === '') {
      // gap between pokemon
      find = true;
      member++;
    } else if (find) {
      // check for item
      var place = line.indexOf(' @ ');
      if (place > 0) {
        team[member].item = items[line.substr(place + 3)];
        line = line.substr(0, place);
      }
      // check for gender (ignored for now)
      if (line.substr(line.length - 4) === ' (M)' || line.substr(line.length - 4) === ' (F)') {
        line = line.substr(0, line.length - 4);
      }
      // check for nickname (ignored)
      place = line.lastIndexOf('(');
      if (place > 0) {
        line = line.substr(place+1);
        line = line.substr(0, line.length - 1);
      }
      if (getPokeFromName(line)) {
        team[member].species = getPokeFromName(line);
      } else {
        console.log("Invalid pokemon: " + line);
      }
      find = false;
    } else if (line.substr(0, 9) === 'Ability: ') {
      if (team[member].species == null)
        continue;
      line = line.substr(9);
      if (abilities.hasOwnProperty(line) && Object.values(team[member].species.abilities).indexOf(line) > -1) {
        team[member].ability = abilities[line];
      } else {
        // use default ability for Pokemon
        team[member].ability = abilities[team[member].species.abilities[0]];
        console.log("Invalid ability " + line + ", replaced with " + team[member].ability.name);
      }
    } else if (line.substr(0, 1) === '-' || line.substr(0, 1) === '~') {
      line = line.substr(1);
      if (line.substr(0,1) === ' ') line = line.substr(1);
      if (getMoveByName(line)) {
        team[member].moves.push(getMoveByName(line));
      } else {
        console.log("Invalid move: " + line);
      }
    }
  }
  return team;
}

function Pokemon(props) {
  return (
    <div className="col-md-2 pokemon" id={"pokemon"+props.num}>
      <Typeahead
        options={pokemon_autocomplete}
        selected={(props.poke.species) ? [props.poke.species.species] : []}
        placeholder={"Pokemon #"+props.num}
        onChange={(e) => props.updaters.poke(e, props.num)}
      />
      <AbilityBox num={props.num} poke={props.poke} updaters={props.updaters} />
      <br />
      <ItemBox num={props.num} poke={props.poke} updaters={props.updaters} />
      <br />
      <div className="move-container">
        <MoveBox poke={props.poke} num={props.num} move="1" updaters={props.updaters} />
        <MoveBox poke={props.poke} num={props.num} move="2" updaters={props.updaters} />
        <MoveBox poke={props.poke} num={props.num} move="3" updaters={props.updaters} />
        <MoveBox poke={props.poke} num={props.num} move="4" updaters={props.updaters} />
      </div>
    </div>
  )
}

function AbilityBox(props) {
  if (props.poke.species != null) {
    return (
      <FormControl
        componentClass="select"
        id="ability-selector-0"
        value={props.poke.ability.name}
        onChange={(e) => props.updaters.ability(e, props.num)}>
        {Object.values(props.poke.species.abilities).map((ability) =>
          <option key={ability} >{ability}</option>
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
        selected={(props.poke.item) ? [props.poke.item.name] : []}
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
      selected={(props.poke.moves[props.move-1]) ? [props.poke.moves[props.move-1].name] : []}
      onChange={(e) => props.updaters.move(e, props.move, props.num)}
    />
  )
}


export default App;
