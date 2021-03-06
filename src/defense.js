/*
 * Defensive type analytics go in this file
 */
import React, { Component } from 'react';
import { Alert, Row, Col, Form, FormGroup, FormControl, Radio, Collapse, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { HorizontalInputComponent, TeamTableHead } from './General.js';

import { types, getEffectiveness } from './data/types.js';
import { moves_autocomplete, getMoveByName } from './data/moves.js';
import { pokemon_autocomplete, getPokeFromName } from './data/pokedex.js';
import { abilities } from './data/abilities.js';
import { calculateDamage} from './data/datautil.js';

const TYPE_MESSAGES = {
  adv : {
    weak    : "Your team is very vulnerable to this type.",
    danger  : "Your team has a few Pokemon that are weak, but also a few that are strong to this type.",
    weakish : "You have some squishy Pokemon but nobody to tank this type.",
    notank  : "None of your Pokemon can take many hits of this type.",
    neutral : "Some of your Pokemon can tank this type.",
    strong  : "Your team can tank this type comfortably.",
    opop    : "Your team walls this type hard.",
  },
  base : {
    weak    : "Your team is very weak to this type!",
    danger  : "Your team has a resistances, but also a number of weaknesses to this type.",
    weakish : "Your team is somewhat weak to this type.",
    notank  : "Your team has no resistances to this type.",
    neutral : "Your team is mostly neutral to this type.",
    strong  : "Your team has plenty of resistances to this type.",
    opop    : "Your team almost entirely resists this type.",
  }
}

/*
 * Renders a defensive type table
 * Both basic and advanced render out of the same component since they're quite similar
 */
class Defense extends Component {
  constructor(props) {
    super(props)
    this.state = {
      damage : "phys",
      level : 50,
      move : 100,
//      movename
//      pokename : "",
      stat : 100
    }
  }

  setDamageType(e) {
    this.setState({damage : e.target.value});
  }

  updatePokemon(e) {
    var newPoke = getPokeFromName(e);
    if (newPoke === null) return;
    var newStat = (this.state.damage === "phys") ? newPoke.baseStats.att : newPoke.baseStats.spa;
    this.setState({
      pokename : e,
      stat : newStat
    });
  }

  updateMove(e) {
    var newMove = getMoveByName(e);
    if (newMove === null) return;
    this.setState({
      move : newMove.bp,
      damage : (newMove.category === "Physical") ? "phys" : "spec"
    })
  }

  render() {
    // update defense matrix
    var team = this.props.team;
    var teamsize = team.filter((poke) => poke.species != null).length;
    if (teamsize === 0) {
      return (
        <Alert>
          Enter team members to get defensive analysis.
        </Alert>
      )
    }
    var defenseMatrix = [];
    // generate a fake attacker that always has STAB
    const attacker = {
      species : {
        types : Object.keys(types),
        baseStats : { "atk" : this.state.stat, "spa" : this.state.stat },
      },
      ability: abilities["Illuminate"] // give a useless ability
    }

    for (var i = 0; i < 6; i ++) {
      var poke = team[i].species;
      if (poke == null) {
        defenseMatrix[i] = null;
      } else {
        defenseMatrix[i] = {};
        for (var type in types) {
          // generate a fake move
          if (types.hasOwnProperty(type)) {
            const move = {
              category : (this.state.damage === "phys") ? "Physical" : "Special",
              bp : this.state.move,
              type : type,
              flags : {}
            }
            defenseMatrix[i][type] = []
            if (this.props.adv) {
              defenseMatrix[i][type] = calculateDamage(attacker, this.state.level, team[i], this.state.level, move)
            } else {
              // simple type effectiveness check
              defenseMatrix[i][type] = getEffectiveness(type, poke.types);
              if (team[i].ability && team[i].ability.modifyDefense) {
                defenseMatrix[i][type] *= team[i].ability.modifyDefense(attacker, move, poke);
              }
            }
          }
        }
      }
    }

    return (
      <div>
        <div className="checkbox">
          <Collapse in={this.props.adv}>
            <Row>
              <Col md={2}>
                Damage type:
                <FormGroup>
                  <Radio value="phys"
                    onChange={this.setDamageType.bind(this)}
                    checked={this.state.damage === "phys"}>
                      Physical
                  </Radio>
                  <Radio value="spec"
                    onChange={this.setDamageType.bind(this)}
                    checked={this.state.damage === "spec"}>
                      Special
                  </Radio>
                </FormGroup>
              </Col>
              <Col md={4}>
                <Form horizontal>
                  <HorizontalInputComponent ratio={6}
                    label="Pokemon"
                    input={<Typeahead
                      disabled
                      options={pokemon_autocomplete}
                      onChange={this.updatePokemon.bind(this)}
                    />}
                  />
                  <HorizontalInputComponent ratio={6}
                    label="Move"
                    input={<Typeahead
                        disabled
                        options={moves_autocomplete}
                        onChange={this.updateMove.bind(this)}
                      />}
                  />
                </Form>
              </Col>
              <Col md={4}>
                <Form horizontal>
                  <HorizontalInputComponent ratio={8}
                    label="Level"
                    input={<FormControl type="number"
                            value={this.state.level}
                            onChange={(e) => this.setState({level: parseInt(e.target.value, 10)})}/>}
                  />
                  <HorizontalInputComponent ratio={8}
                    label="Base Attack"
                    input={<FormControl type="number"
                            value={this.state.stat}
                            onChange={(e) => this.setState({stat: parseInt(e.target.value, 10)})}/>}
                  />
                  <HorizontalInputComponent ratio={8}
                    label="Move BP"
                    input={<FormControl type="number"
                            value={this.state.move}
                            onChange={(e) => this.setState({move: parseInt(e.target.value, 10)})}/>}
                  />
                </Form>
              </Col>
            </Row>
          </Collapse>
        </div>
        <Table bordered striped id="typetable-def">
          <TeamTableHead
            team={team}
            teamsize={teamsize}
            condition={(poke) => poke.species != null}
          />
          <tbody>
            {Object.keys(types).map((type) =>
              <DefenseType adv={this.props.adv}
                key={type}
                type={type}
                matrix={defenseMatrix}
              />
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

function DefenseType(props) {
  return (
    <tr>
      <DefenseTypeOverall type={props.type} adv={props.adv} matrix={props.matrix}/>
      {props.matrix.map((val, index) =>
        val != null && (
          <DefenseTypeIndiv
            key={props.type+index}
            value={val[props.type]}
            adv={props.adv}
          />)
      )}
    </tr>
  )
}

function DefenseTypeIndiv(props) {
  var color = "";
  if (props.value === null) return null;
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
    if (val < 1)
      color = "success"
    if (val === 1)
      color = "info"
    if (val > 1)
      color = "warning"
    if (val > 2)
      color = "danger"
  }
  val = (props.adv) ? Math.round(100/props.value) + "% (" + val + "HKO)" : val;
  return <td className={color + " text-center"}>{val}</td>
}

function DefenseTypeOverall(props) {
  var total = [0,0,0];
  for (var i = 0; i < props.matrix.length; i++) {
    if (props.matrix[i] == null)
      continue;
    var mul = props.matrix[i][props.type];
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
      if (mul === null) {
        // do nothing
      } else if (mul > 1) {
        total[0] += 1;
      } else if (mul < 1) {
        total[2] += 1;
        if (mul === 0) total[2] += 0.5; // immunities are super gud
      } else {
        total[1] += 1;
      }
    }
  }

  var messages = (props.adv) ? TYPE_MESSAGES.adv : TYPE_MESSAGES.base;
  var color, tip;
  // lots of weaknesses
  if (total[0] > 2.5) {
    // but some resists
    if (total[2] > 1.5) {
      color = "warning";
      tip = messages.danger;
    // but no resists
    } else {
      color = "danger";
      tip = messages.weak;
    }
  // enough resists without too many weaknesses
  } else if (total[2] > 2.5) {
    color = "success";
    tip = messages.opop;
  } else if (total[2] > 1) {
    color = "success";
    tip = messages.strong;
  // no resists
  } else if (total[2] === 0) {
    // and some weaknesses
    if (total[0] > 1) {
      color = "danger";
      tip = messages.weakish;
    // but no weaknesses
    } else {
      color = "warning"
      tip = messages.notank;
    }
  // everything else
  } else {
    color = "info"
    tip = messages.neutral;
  }

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={props.type+"-help"}>{tip}</Tooltip>}>
      <td className={color + " text-center"}>{props.type}</td>
    </OverlayTrigger>
  )
}

export default Defense;
