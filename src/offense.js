/*
 * offensive type analytics go here
 */

import React, { Component } from 'react';
import { Alert, Checkbox, Table, Button, Collapse, Well, Col, FormControl, Row, Form, Tabs, Tab, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { HorizontalInputComponent, TeamTableHead } from './General.js';

import { types, getTypeCombo, getEffectiveness } from './data/types.js';
import { pokedex, pokedex_by_types } from './data/pokedex.js';
import { abilities } from './data/abilities.js';
import { calculateDamage} from './data/datautil.js';

const OFFENSE_CATEGORIES = {
  adv: ["1HKO", "2HKO", "3HKO", "4HKO", "5HKO"],
  base: ["4x", "2x", "1x", "0.5x", "0.25x", "0x"]
}

const MATCHUP_MESSAGES = {
  adv : {
    danger  : "Your team is very vulnerable to this type.",
    warning : "Your team has a few Pokemon that are weak, but also a few that are strong to this type.",
    weakish : "You have some squishy Pokemon but nobody to tank this type.",
    nobreak : "None of your Pokemon can take many hits of this type.",
    neutral : "Some of your Pokemon can tank this type.",
    strong  : "Your team can tank this type comfortably."
  },
  base : {
    danger  : "Your team cannot hit this type combination well at all!",
    warning : "Some of your team can hit this type well, but others can't.",
    weakish : "Your team is somewhat weak to this type.",
    nobreak : "Your team has no Pokemon good against this type.",
    neutral : "Your team is mostly neutral to this type.",
    strong  : "Your team can deal with this type quite well."
  }
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
      advMatrix : null,
      matchups : null,
      currTeam : null,
      filterNonEvo : true,
      filterLegends : false,
      filterFormes : false,
    }
  }

  buildAdvancedMatrix() {
    document.body.style.cursor = 'wait';
    var newMatrix = this.buildOffenseMatrix();
    this.setState({advMatrix: newMatrix});
    document.body.style.cursor = 'default';
  }

  buildOffenseMatrix() {
    const categories = (this.props.adv) ? OFFENSE_CATEGORIES.adv : OFFENSE_CATEGORIES.base;
    var newMatrix = { byCategory : [], byMatchup: []};
    newMatrix.matchups = [];
    for (var i = 0; i < 6; i++) {
      newMatrix.byCategory[i] = null;
      newMatrix.byMatchup[i] = null;
      // check if this mon has moves
      if (this.props.team[i].moves.length === 0)
        continue;

      // replace here since we don't want matchups to overfill
      newMatrix.matchups = [];
      newMatrix.byMatchup[i] = {};
      newMatrix.byCategory[i] = {};
      for (var cat = 0; cat < categories.length; cat++)
        newMatrix.byCategory[i][categories[cat]] = [];

      if (this.props.adv) {
        for (var poke in pokedex) {
          // check filters
          if (this.state.filterNonEvo && pokedex[poke].evos)
            continue;
          if (this.state.filterLegends && pokedex[poke].legend)
            continue;
          if (this.state.filterFormes && pokedex[poke].baseSpecies)
            continue;

          var min = 5;
          for (var abil in pokedex[poke].abilities) {
            if (pokedex[poke].abilities.hasOwnProperty(abil)) {
              var mockup = {
                ability : abilities[pokedex[poke].abilities[abil]],
                species : pokedex[poke]
              }
              for (var m = 0; m < this.props.team[i].moves.length; m++) {
                var moveDamage = Math.round(calculateDamage(this.props.team[i], this.state.level, mockup, this.state.level, this.props.team[i].moves[m])+0.5)
                if (moveDamage < min) {
                  min = moveDamage;
                }
              }
            }
          }
          newMatrix.byMatchup[i][pokedex[poke].species] = min;
          newMatrix.matchups.push(pokedex[poke].species);
          min += "HKO";
          newMatrix.byCategory[i][min].push(pokedex[poke].species);
        }
      } else {
        var typeArray = Object.keys(types);
        for (var t1 = 0; t1 < typeArray.length; t1++) {
          newMatrix.byCategory[i][getPokeVsType(this.props.team[i], [typeArray[t1]]) + "x"].push(typeArray[t1]);
          newMatrix.byMatchup[i][typeArray[t1]] = getPokeVsType(this.props.team[i], [typeArray[t1]]);
          newMatrix.matchups.push(typeArray[t1]);
          for (var t2 = (t1+1); t2 < typeArray.length; t2++)  {
            var combo = getTypeCombo([typeArray[t1], typeArray[t2]]);
            if (pokedex_by_types[combo] != null) {
              newMatrix.byCategory[i][getPokeVsType(this.props.team[i],[typeArray[t1],typeArray[t2]]) + "x"].push(combo);
              newMatrix.byMatchup[i][combo] = getPokeVsType(this.props.team[i], [typeArray[t1],typeArray[t2]]);
              newMatrix.matchups.push(combo);
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
        <Collapse in={this.props.adv}>
          <div>
            Options:
            <Row>
              <Col md={3}>
                {/*
                  it's a bit weird, but the variable is for whether we filter or not,
                  but the checkboxes are for showing or not (for user clarity)
                */}
                <Checkbox checked={!this.state.filterNonEvo}
                  onChange={(e) => this.setState({filterNonEvo : !e.target.checked})}>
                  Unevolved Pokemon
                </Checkbox>
                <Checkbox checked={!this.state.filterLegends}
                  onChange={(e) => this.setState({filterLegends : !e.target.checked})}>
                  Legendary Pokemon
                </Checkbox>
                <Checkbox checked={!this.state.filterFormes}
                  onChange={(e) => this.setState({filterFormes : !e.target.checked})}>
                  Alternate Formes
                </Checkbox>
              </Col>
              <Col md={3}>
                <Form horizontal>
                  <HorizontalInputComponent ratio={4}
                    label="Level"
                    input={<FormControl type="number"
                            value={this.state.level}
                            onChange={(e) => this.setState({level: parseInt(e.target.value, 10)})}/>}
                  />
                </Form>
              </Col>
              <Col md={2}></Col>
              <Col md={4}>
                <Row>
                  <Button bsStyle="info" onClick={this.buildAdvancedMatrix.bind(this)}>
                    {(this.state.advMatrix == null) ? "Run" : "Re-run"} analysis
                  </Button>
                </Row>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
    );

    var teamsize = this.props.team.filter((poke) => poke.species != null && poke.moves.length > 0).length;
    if (teamsize === 0) return (
      <Alert>
        Enter team members with moves to get offensive analysis.
      </Alert>
    )

    var offenseMatrix = null;
    const categories = (this.props.adv) ? OFFENSE_CATEGORIES.adv : OFFENSE_CATEGORIES.base;
    if (this.props.adv && this.state.advMatrix === null) {
      // setup interface to manually compute advanced matrix
      return (
        <div>
          {advOptions}
          <Alert bsStyle="warning">
            <h4>Warning</h4>
            <p>Advanced offensive analysis may take a little while to run, especially if you have a full team.</p>
          </Alert>
        </div>
      )
    } else if (!this.props.adv) {
      // synchronously compute basic matrix
      offenseMatrix = this.buildOffenseMatrix();
    } else {
      // use computed offense matrix
      offenseMatrix = this.state.advMatrix;
    }

    return (
      <div>
        {advOptions}
        <Tabs defaultActiveKey={1} animation={false} id='offense-tables'>
          <Tab eventKey={1} title="Grouped">
            <Table bordered striped>
              <TeamTableHead
                team={this.props.team}
                teamsize={teamsize}
                condition={(poke) => poke.species != null && poke.moves.length > 0}
              />
              <OffenseTableGrouped team={this.props.team} adv={this.props.adv} categories={categories} matrix={offenseMatrix.byCategory} />
            </Table>
          </Tab>
          <Tab eventKey={2} title="Full">
            <Table bordered striped>
              <TeamTableHead
                team={this.props.team}
                teamsize={teamsize}
                condition={(poke) => poke.species != null && poke.moves.length > 0}
              />
              <OffenseTableFull team={this.props.team} adv={this.props.adv} matchups={offenseMatrix.matchups} matrix={offenseMatrix.byMatchup} />
            </Table>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function OffenseTableGrouped(props) {
  return (
    <tbody>
      {props.categories.map((c) =>
        <tr key={c}>
          <th className="text-center" style={{"verticalAlign":"middle", "fontSize":"20px"}}>{c}</th>
          {props.matrix.map((poke, index) =>
            (props.team[index].species != null && props.team[index].moves.length > 0)
            ? (props.adv)
              ? <OffenseMatchupAdvanced poke={poke} mult={c} key={index} />
              : <OffenseMatchup poke={poke} mult={c} key={index} />
            : null
          )}
        </tr>
      )}
    </tbody>
  );
}

class OffenseMatchup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.poke === null) return null;
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
    if (this.props.poke === null) return null;
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

function OffenseTableFull(props) {
  return (
    <tbody>
      {props.matchups.map((c) =>
        <tr key={c}>
          <OffenseEntryOverall matchup={c} adv={props.adv} matrix={props.matrix}/>
          {props.matrix.map((val, index) =>
            (val != null) &&
              <OffenseEntryIndiv
                key={c+index}
                value={val[c]}
                adv={props.adv}
              />
          )}
        </tr>
      )}
    </tbody>
  )
}

function OffenseEntryIndiv(props) {
  if (props.value === null) return null;
  var color = "";
  var val = props.value;
  if (props.adv) {
    val = Math.round(val+0.5);
    if (val <= 0) {
      color = "success"
    } else if (val <= 1) {
      color = "danger"
    } else if (val <= 2) {
      color = "warning"
    } else if (val <= 3) {
      color = "info"
    } else {
      color = "success"
    }
  } else {
    if (val > 1) {
      color = "success"
    } else if (val === 1) {
      color = "info"
    } if (val < 1) {
      color = "warning"
    } if (val < 0.5) {
      color = "danger"
    }
  }
  val = (props.adv) ? Math.round(100/props.value) + "% (" + val + "HKO)" : val;
  return <td className={color + " text-center"}>{val}</td>
}

function OffenseEntryOverall(props) {
  var total = [0,0,0];
  for (var i = 0; i < props.matrix.length; i++) {
    if (props.matrix[i] === null) continue;
    var mul = props.matrix[i][props.matchup];
    if (props.adv) {
      if (mul <= 0) {
        // immunity or absorption
        total[2] += 1.5;
      } else if (mul < 1) {
        // one hit KO
        total[0] += 1;
      } else if (mul < 1.9) {
        // guaranteed two hit KO through lefties
        total[0] += 1;
      } else if (mul < 3) {
        // three hit KO
        total[1] += 1;
      } else {
        // four hit or better
        total[2] += 1;
      }
    } else {
      if (mul === 1) {
        total[1] += 1;
      } else if (mul < 1) {
        total[0] += 1;
        if (mul < 0.5) total[0] += 0.5; // 4x resists are walled HARD
      } else if (mul > 1) {
        total[2] += 1;
        if (mul > 2) total[2] += 0.5; // 4x weaks are
      }
    }
  }

  var messages = (props.adv) ? MATCHUP_MESSAGES.adv : MATCHUP_MESSAGES.base;
  var color, tip;
  // walls a lot
  if (total[0] > 2.5) {
    // but can be broken
    if (total[2] > 1.5) {
      color = "warning";
      tip = messages.warning;
    // straight up walled
    } else {
      color = "danger";
      tip = messages.danger;
    }
  // can break easily
  } else if (total[2] > 2) {
    color = "success";
    tip = messages.strong;
  // can't hit super effectively
  } else if (total[2] === 0) {
    // but sometimes walled
    if (total[0] > 1) {
      color = "danger";
      tip = messages.weakish;
    // but also never walled
    } else {
      color = "warning"
      tip = messages.nobreak;
    }
  // everything else
  } else {
    color = "info"
    tip = messages.neutral;
  }

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={props.value+"-help"}>{tip}</Tooltip>}>
      <td className={color + " text-center"}>{props.matchup}</td>
    </OverlayTrigger>
  )
}

/*
 * returns the best multiplier a pokemon can get against a type/combination
 */
function getPokeVsType(poke, def) {
  var max = 0;
  for (var m = 0; m < poke.moves.length; m++) {
    var move = poke.moves[m];
    if (move === null)
      continue;
    if (move.category === "Other")
      continue;
    if (getEffectiveness(move.type, def) >= max)
      max = getEffectiveness(move.type, def);
  }
  return max;
}

export default Offense;
