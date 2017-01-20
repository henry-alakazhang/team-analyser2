/*
 * offensive type analytics go here
 */

import React, { Component } from 'react';
import { Alert, Checkbox, Table, Button, Collapse, Well, Col, FormControl, Row, Form} from 'react-bootstrap';
import HorizontalInputComponent from './General.js';

import { pokedex, pokedex_by_types } from './data/pokedex.js';
import { abilities } from './data/abilities.js';
import { calculateDamage} from './data/datautil.js';

const OFFENSE_CATEGORIES = {
  adv: ["1HKO", "2HKO", "3HKO", "4HKO", "5HKO"],
  base: ["4x", "2x", "1x", "0.5x", "0.25x", "0x"]
}

/*
 * Renders a basic offensive analysis
 * Calculates number of type combinations/pokemon that can be hit with various multipliers
 */
class Offense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 50,
      adv : false,
      advMatrix : null,
      currTeam : null
    }
  }

  toggleAdvanced(e) {
    this.setState({adv : e.target.checked, advMatrix : null});
  }

  buildAdvancedMatrix() {
    document.body.style.cursor = 'wait';
    var newMatrix = this.buildOffenseMatrix();
    this.setState({advMatrix: newMatrix});
    document.body.style.cursor = 'default';
  }

  buildOffenseMatrix() {
    const categories = (this.state.adv) ? OFFENSE_CATEGORIES.adv : OFFENSE_CATEGORIES.base;
    var newMatrix = [];
    for (var i = 0; i < 6; i++) {
      newMatrix[i] = null;
      // check if this mon has moves
      if (this.props.team[i].moves.length == 0)
        continue;

      newMatrix[i] = {};
      for (var cat in categories)
        newMatrix[i][categories[cat]] = [];

      if (this.state.adv) {
        for (var poke in pokedex) {
          var min = 5;
          for (var abil in pokedex[poke].abilities) {
            var mockup = {
              ability : pokedex[poke].abilities[abil],
              species : pokedex[poke]
            }
            for (var m in this.props.team[i].moves) {
              var moveDamage = Math.round(calculateDamage(this.props.team[i], this.state.level, mockup, this.state.level, this.props.team[i].moves[m])+0.5)
              if (moveDamage < min) {
                min = moveDamage;
              }
            }
          }
          min += "HKO";
          newMatrix[i][min].push(pokedex[poke].species);
        }
      } else {
        var typeArray = Object.keys(window.types);
        for (var t1 = 0; t1 < typeArray.length; t1++) {
          newMatrix[i][getPokeVsType(this.props.team[i], [typeArray[t1]]) + "x"].push(typeArray[t1]);
          for (var t2 = (t1+1); t2 < typeArray.length; t2++)  {
            var combo = window.getTypeCombo([typeArray[t1], typeArray[t2]]);
            if (pokedex_by_types[combo] != null) {
              newMatrix[i][getPokeVsType(this.props.team[i],[typeArray[t1],typeArray[t2]]) + "x"].push(combo);
            }
          }
        }
      }
    }
    return newMatrix;
  }

  render() {
    var advOptions = (
      <div className="Checkbox">
        <Checkbox onClick={this.toggleAdvanced.bind(this)}>Toggle Advanced Analysis</Checkbox>
        <Collapse in={this.state.adv}>
          <div>
            <Row>
              <Col md={4}>
                <Form horizontal>
                  <HorizontalInputComponent ratio={4}
                    label="Level"
                    input={<FormControl type="number"
                            value={this.state.level}
                            onChange={(e) => this.setState({level: parseInt(e.target.value, 10)})}/>}
                  />
                </Form>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
    );

    var teamsize = this.props.team.filter((poke) => poke.species != null && poke.moves.length > 0).length;
    if (teamsize == 0) return (
      <Alert>
        Enter team members with moves to get offensive analysis.
      </Alert>
    )

    var offenseMatrix = null;
    const categories = (this.state.adv) ? OFFENSE_CATEGORIES.adv : OFFENSE_CATEGORIES.base;
    if (this.state.adv && this.state.advMatrix == null) {
      // setup interface to manually compute advanced matrix
      return (
        <div>
          {advOptions}
          <Alert bsStyle="warning">
            <h4>Warning</h4>
            <p>Advanced offensive analysis may take a little while to run, especially if you have a full team.</p>
            <br/>
            <Button bsStyle="danger" onClick={this.buildAdvancedMatrix.bind(this)}>Run analysis</Button>
          </Alert>
        </div>
      )
    } else if (!this.state.adv) {
      // synchronously compute basic matrix
      offenseMatrix = this.buildOffenseMatrix();
    } else {
      // use computed offense matrix
      offenseMatrix = this.state.advMatrix;
    }

    return (
      <div>
        {advOptions}
        <Table bordered striped>
          <thead id="typetable-head">
            <tr>
              <th style={{width:"10%"}} />
              {this.props.team.map((poke, index) =>
                (poke.species != null && poke.moves.length > 0) ?
                  <th className="text-center" key={index} style={{width: 90/teamsize+"%"}}>
                    {poke.species.species}
                  </th>
                : null
              )}
            </tr>
          </thead>
          <tbody>
            {categories.map((c) =>
              <tr key={c}>
                <th className="text-center" style={{"verticalAlign":"middle", "fontSize":"20px"}}>{c}</th>
                {offenseMatrix.map((poke, index) =>
                  (this.props.team[index].species != null && this.props.team[index].moves.length > 0)
                  ? (this.state.adv)
                    ? <OffenseMatchupAdvanced poke={poke} mult={c} key={index} />
                    : <OffenseMatchup poke={poke} mult={c} key={index} />
                  : null
                )}
              </tr>
            )}
          </tbody>
        </Table>
        { this.state.adv && this.state.advMatrix != null && (
          <Row>
            <Button bsStyle="info" onClick={this.buildAdvancedMatrix.bind(this)}>Re-run analysis</Button>
          </Row>)
        }
      </div>
    )
  }
}

class OffenseMatchup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.poke == null) return null;
    var buttonStyle;
    switch (this.props.mult) {
      case "4x" :
      case "2x" : buttonStyle = "success"; break;
      case "1x" : buttonStyle = "info"; break;
      case "0.5x" : buttonStyle = "warning"; break;
      case "0.25x" :
      case "0" : buttonStyle = "danger"; break;
      default: break;
    }
    return (
      <th className="text-center">
        <Button block bsStyle={buttonStyle} onClick={()=> this.setState({ open: !this.state.open })}>
          {this.props.poke[this.props.mult].length + " type combo(s)"}
          <br />
          {this.props.poke[this.props.mult].reduce((a, b) => a + pokedex_by_types[b].length, 0) + " Pokemon"}
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              {this.props.poke[this.props.mult].map((combo) =>
                <div key={combo}>{combo}</div>
              )}
            </Well>
          </div>
        </Collapse>
      </th>
    )
  }
}

class OffenseMatchupAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.poke == null) return null;
    var buttonStyle;
    switch (this.props.mult) {
      case "1HKO" :
      case "2HKO" : buttonStyle = "success"; break;
      case "3HKO" : buttonStyle = "info"; break;
      case "4HKO" : buttonStyle = "warning"; break;
      case "5HKO" : buttonStyle = "danger"; break;
      default: break;
    }
    return (
      <th className="text-center">
        <Button block bsStyle={buttonStyle} onClick={()=> this.setState({ open: !this.state.open })}>
          {this.props.poke[this.props.mult].length + " Pokemon"}
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              {this.props.poke[this.props.mult].map((poke, index) =>
                <div key={poke}>{poke}</div>
              )}
            </Well>
          </div>
        </Collapse>
      </th>
    )
  }
}

/*
 * returns the best multiplier a pokemon can get against a type/combination
 */
function getPokeVsType(poke, def) {
  var max = 0;
  for (var m in poke.moves) {
    var move = poke.moves[m];
    if (move == null)
      continue;
    if (move.category == "Other")
      continue;
    if (window.getEffectiveness(move.type, def) >= max)
      max = window.getEffectiveness(move.type, def);
  }
  return max;
}

export default Offense;
