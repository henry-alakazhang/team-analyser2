/*
 * offensive type analytics go here
 */

import React, { Component } from 'react';
import { Alert, Checkbox, Table, Button, Collapse, Well, Col, FormControl, Row, Form, FormGroup, Radio, Tabs, Tab, OverlayTrigger, Tooltip} from 'react-bootstrap';
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
    danger  : "Your team cannot deal with this Pokemon.",
    risky   : "Your team is very reliant on one Pokemon to deal with this Pokemon.",
    warning : "Your team is quite polarised against this Pokemon.",
    nobreak : "Your team has no Pokemon good against this one.",
    fine    : "Your team is all fine against this Pokemon.",
    neutral : "Your team is mostly neutral against this Pokemon.",
    strong  : "Most of your team can handle this Pokemon comfortably."
  },
  base : {
    danger  : "Your team cannot hit this type combination well at all!",
    risky   : "Your team is very reliant on one Pokemon to hit this type.",
    warning : "Some of your team can hit this type well, but others can't.",
    nobreak : "Your team has no Pokemon good against this type.",
    fine    : "Your team is all fine against this type.",
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
      hideGood : false,
      sort : "None",
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

          var min = Infinity;
          for (var abil in pokedex[poke].abilities) {
            if (pokedex[poke].abilities.hasOwnProperty(abil)) {
              var mockup = {
                ability : abilities[pokedex[poke].abilities[abil]],
                species : pokedex[poke]
              }
              for (var m = 0; m < this.props.team[i].moves.length; m++) {
                var moveDamage = calculateDamage(this.props.team[i], this.state.level, mockup, this.state.level, this.props.team[i].moves[m])
                if (moveDamage < min) {
                  min = moveDamage;
                }
              }
            }
          }
          newMatrix.byMatchup[i][pokedex[poke].species] = min;
          newMatrix.matchups.push(pokedex[poke].species);
          min = ((min > 5) ? 5 : Math.round(min+0.5)) + "HKO";
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
            <Row>
              <Col md={2}>
                Filters:
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
              <Col md={2}>
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

    if (this.state.sort === "Worst") {
      offenseMatrix.matchups.sort(function(a, b) {
        return judgeMatchup(offenseMatrix.byMatchup, a, this.props.adv).total - judgeMatchup(offenseMatrix.byMatchup, b, this.props.adv).total;
      }.bind(this));
    } else if (this.state.sort === "Best") {
      offenseMatrix.matchups.sort(function(a, b) {
        return judgeMatchup(offenseMatrix.byMatchup, b, this.props.adv).total - judgeMatchup(offenseMatrix.byMatchup, a, this.props.adv).total;
      }.bind(this));
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
            <Row>
              Sort by:
              <FormGroup>
                <Radio inline checked={this.state.sort === "None"}
                  onChange={() => this.setState({sort : "None"})}>
                  None
                </Radio>
                <Radio inline checked={this.state.sort === "Best"}
                  onChange={() => this.setState({sort : "Best"})}>
                  Best
                </Radio>
                <Radio inline checked={this.state.sort === "Worst"}
                  onChange={() => this.setState({sort : "Worst"})}>
                  Worst
                </Radio>
              </FormGroup>
              <Checkbox checked={this.state.hideGood}
                onChange={(e) => this.setState({hideGood: e.target.checked})}>
                Hide good matchups
              </Checkbox>
            </Row>
            <Table bordered striped>
              <TeamTableHead
                team={this.props.team}
                teamsize={teamsize}
                condition={(poke) => poke.species != null && poke.moves.length > 0}
              />
              <OffenseTableFull
                team={this.props.team}
                adv={this.props.adv}
                matchups={offenseMatrix.matchups}
                matrix={offenseMatrix.byMatchup}
                hidegood={this.state.hideGood}
              />
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
      {props.matchups.map((c) => (
        <OffenseTableEntry key={c} matrix={props.matrix} adv={props.adv} matchup={c} hidegood={props.hidegood} />
      ))}
    </tbody>
  )
}

function OffenseTableEntry(props) {
  const messages = (props.adv) ? MATCHUP_MESSAGES.adv : MATCHUP_MESSAGES.base;
  const result = judgeMatchup(props.matrix, props.matchup, props.adv);
  var color, tip;

  // obvious overall strength checks
  if (result.total/result.teamSize >= 67) {
    // skip good matchup if told to.
    if (props.hidegood)
      return null;
    color = "success";
    tip = messages.strong;
  } else if (result.total/result.teamSize <= 33) {
    color = "danger";
    if (result.overall.good >= 1) {
      tip = messages.risky;
    } else {
      tip = messages.danger;
    }
  } else {
    // in the middle - more specific details
    if (result.overall.good/result.teamSize >= 0.3 && result.overall.bad/result.teamSize >= 0.5) {
      // some good, some bad
      color = "warning";
      tip = messages.warning;
    } else if (result.overall.good === 0) {
      // nobody good against this
      color = "warning";
      tip = messages.nobreak;
    } else if (result.overall.bad === 0) {
      // nobody bad against this
      color = "info";
      tip = messages.fine;
    } else {
      // most of the team is neutral.
      color = "info";
      tip = messages.neutral;
    }
  }
  return (<tr>
    <OverlayTrigger placement="top" overlay={<Tooltip id={props.matchup+"-help"}>{tip}</Tooltip>}>
      <td className={color + " text-center"}>{props.matchup}</td>
    </OverlayTrigger>
    {props.matrix.map((val, index) =>
      (val != null) &&
        <OffenseEntryIndiv
          key={props.matchup+index}
          value={val[props.matchup]}
          score={result.scores[index]}
          adv={props.adv}
        />
    )}
  </tr>)
}

/*
 * Judges a matchup based on individual team members
 * returns an object:
 * {scores[], teamSize, overall{good, ok, bad}}
 * Used for calculating colorisation/overall team rating.
 */
function judgeMatchup(matrix, matchup, adv) {
  var result = {
    overall : {
      good: 0,
      ok: 0,
      bad: 0
    },
    scores : [],
    teamSize : 0,
    total : 0,
  }
  for (var i = 0; i < matrix.length; i++) {
    if (matrix[i] === null) continue;
    var val = matrix[i][matchup];
    var thisScore;
    if (adv) {
      // returns 100 for 1HKO, 75 for 2HKO, 50 for 3HKO ... 0 for 6+HKO.
      thisScore = Math.min(100, Math.max(0, 100 - 25*(val - 1)));
    } else {
      if (val >= 4) {
        thisScore = 100;
      } else if (val >= 2) {
        thisScore = 80;
      } else if (val > 1) {
        thisScore = 60;
      } else if (val === 1) {
        thisScore = 50;
      } else {
        // scales from 50 down to 0.
        thisScore = 50 * val;
      }
    }
    if (thisScore >= 100) {
      result.overall.good += 1.5;
    } else if (thisScore >= 65) {
      result.overall.good += 1;
    } else if (thisScore >= 35) {
      result.overall.ok += 1;
    } else if (thisScore >= 10) {
      result.overall.bad += 1;
    } else {
      result.overall.bad += 1.5;
    }
    result.scores[i] = thisScore;
    result.total += thisScore;
    result.teamSize++;
  }
  return result;
}

function OffenseEntryIndiv(props) {
  if (props.value === null) return null;
  var color = "";
  if (props.score > 75) {
    // only gets OHKOs + any super effective
    color = "success";
  } else if (props.score >= 50) {
    // gets any >= 1 multiplier and 2-3HKOs.
    color = "info";
  } else if (props.score > 25) {
    // gets 4HKOs and poor multipliers
    color = "warning";
  } else {
    // the rest (aka. really bad)
    color = "danger";
  }
  var val = (props.adv) ? Math.round(100/props.value) + "% (" + Math.round(props.value+0.5) + "HKO)" : props.value;
  return <td className={color + " text-center"}>{val}</td>
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
