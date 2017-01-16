/*
 * All the type analytics go here
 */
import React, { Component } from 'react';
import { Row, Col, Form, ControlLabel, FormGroup, FormControl, Radio, Collapse, Checkbox, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

var TYPE_MESSAGES = {
  adv : {
    weak    : "Your team is very vulnerable to this type.",
    danger  : "Your team has a few Pokemon that are weak, but also a few that are strong to this type.",
    weakish : "You have some squishy Pokemon but nobody to tank this type.",
    notank  : "None of your Pokemon can take many hits of this type.",
    neutral : "Some of your Pokemon can tank this type.",
    strong  : "Your team can tank this type comfortably."
  },
  base : {
    weak    : "Your team is very weak to this type!",
    danger  : "Your team has a resistances, but also a number of weaknesses to this type.",
    weakish : "Your team is somewhat weak to this type.",
    notank  : "Your team has no resistances to this type.",
    neutral : "Your team is mostly neutral to this type.",
    strong  : "Your team has plenty of resistances to this type."
  }
}

class Defense extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adv : false,
      damage : "phys",
      level : 50,
      move : 100,
//      movename
//      pokename : "",
      stat : 100
    }
  }

  toggleAdvanced(e) {
    this.setState({adv : e.target.checked})
  }

  setDamageType(e) {
    this.setState({damage : e.target.value});
  }

  updatePokemon(e) {
    var newPoke = window.getPokeFromName(e);
    if (newPoke == null) return;
    var newStat = (this.state.damage == "phys") ? newPoke.baseStats.att : newPoke.baseStats.spa;
    this.setState({
      pokename : e,
      stat : newStat
    });
  }

  updateMove(e) {
    var newMove = window.getMoveByName(e);
    if (newMove == null) return;
    this.setState({
      move : newMove.bp,
      damage : (newMove.category = "Physical") ? "phys" : "spec"
    })
  }

  updateLevel(e) {
    this.setState({level : parseInt(e.target.value)});
  }

  updateBaseAtt(e) {
    this.setState({stat : parseInt(e.target.value)});
  }

  updateMoveBP(e) {
    this.setState({move : parseInt(e.target.value)});
  }

  render() {
    // update defense matrix
    var team = this.props.team;
    var teamsize = team.filter((poke) => poke.species != null).length;
    if (teamsize === 0)
      return null;
    var defenseMatrix = {};
    for (var type in window.types) {
      defenseMatrix[type] = [];
      for (var i = 0; i < 6; i ++) {
        var poke = team[i].species;
        if (poke != null) {
          if (this.state.adv) {
            // calculate raw stats and use damage formula
            var def = (this.state.damage == "phys") ? poke.baseStats.def : poke.baseStats.spd;
            def = ((2*def + 30 + 30)*this.state.level/100) + 5;
            var hp = ((2*poke.baseStats.hp + 30 + 30)*this.state.level/100) + this.state.level + 10;
            var damage = (((2 * this.state.level + 10) / 250) * (this.state.stat/def) * this.state.move + 2) * window.getEffectiveness(type, poke.types) * 1.5;

            // add ability
            if (window.abilities[team[i].ability].modifyEffectiveness)
              damage*= window.abilities[team[i].ability].modifyEffectiveness(type, poke.types);

            //defenseMatrix values are nHKO
            defenseMatrix[type][i] = ((damage != 0) ? hp/damage : 0).toFixed(2);
          } else {
            // simple type effectiveness check
            defenseMatrix[type][i] = window.getEffectiveness(type, poke.types);
            if (team[i].ability && window.abilities[team[i].ability].modifyEffectiveness) {
              defenseMatrix[type][i] *= window.abilities[team[i].ability]
                                        .modifyEffectiveness(type, poke.types);
            }
          }
        } else {
          defenseMatrix[type][i] = null;
        }
      }
    }
      // /* Defensive type analysis
      //  * Advanced, runs damage calculations
      //  */
      // function updateDefenseMatrixAdv() {
      //     for (var type in types) {
      //         for (var i = 0; i < NUM_POKEMON; i ++) {
      //             var poke = team[i].dex;
      //             if (poke != -1) {
      //                 // actually use the damage formula
      //                 if ($('#wimpy-radio').is(':checked')) {
      //                     // 80BP off 70 base attack - eg. Wailmer using Scald
      //                     var att = ((30 + 2*70 + 30)/2) + 5;
      //                     var pow = 80;
      //                 } else if ($('#strong-radio').is(':checked')) {
      //                     // 100BP off 100 base attack - eg. Flygon using Earthquake
      //                     var att = ((30 + 2*100 + 30)/2) + 5;
      //                     var pow = 100
      //                 } else if ($('#deadly-radio').is(':checked')) {
      //                     // 120BP off 130 base attack - eg. Heatran using Fire Blast
      //                     var att = ((30 + 2*130 + 30)/2) + 5;
      //                     var pow = 120;
      //                 } else {
      //                     // MEGA RAY DRAGON ASCENT LEVEL DESTRUCTION
      //                     // (may be slightly unrealistic to achieve)
      //                     var att = ((30 + 2*180) + 30/2) + 5;
      //                     var pow = 150;
      //                 }
      //             } else {
      //                 defenseMatrix[type][i] = 0;
      //             }
      //         }
      //     }
      // }

    return (
      <div>
        <div className="checkbox">
          <Checkbox onClick={this.toggleAdvanced.bind(this)}>Toggle Advanced Analysis</Checkbox>
          <Collapse in={this.state.adv}>
            <Row>
              <Col md={2}>
                Damage type:
                <FormGroup>
                  <Radio value="phys"
                    onChange={this.setDamageType.bind(this)}
                    checked={this.state.damage == "phys"}>
                      Physical
                  </Radio>
                  <Radio value="spec"
                    onChange={this.setDamageType.bind(this)}
                    checked={this.state.damage == "spec"}>
                      Special
                  </Radio>
                </FormGroup>
              </Col>
              <Col md={4}>
                <Form horizontal>
                  <FormGroup bsSize="sm">
                    <Col componentClass={ControlLabel} sm={6}>
                      Pokemon
                    </Col>
                    <Col sm={6}>
                      <Typeahead
                        disabled
                        options={window.pokemon_autocomplete}
                        onChange={this.updatePokemon.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup bsSize="sm">
                    <Col componentClass={ControlLabel} sm={6}>
                      Move
                    </Col>
                    <Col sm={6}>
                      <Typeahead
                        disabled
                        options={window.moves_autocomplete}
                        onChange={this.updateMove.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col md={4}>
                <Form horizontal>
                  <FormGroup bsSize="sm">
                    <Col componentClass={ControlLabel} sm={8}>
                     Level
                    </Col>
                    <Col sm={4}>
                      <FormControl type="number" value={this.state.level} onChange={this.updateLevel.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup bsSize="sm">
                    <Col componentClass={ControlLabel} sm={8}>
                      Base attack
                    </Col>
                    <Col sm={4}>
                      <FormControl type="number" value={this.state.stat} onChange={this.updateBaseAtt.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup bsSize="sm">
                    <Col componentClass={ControlLabel} sm={8}>
                      Move BP
                    </Col>
                    <Col sm={4}>
                      <FormControl type="number" value={this.state.move} onChange={this.updateMoveBP.bind(this)}/>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Collapse>
        </div>
        <Table bordered striped id="typetable-def">
          <thead id="typetable-head">
            <tr>
              <th style={{width:"10%"}}></th>
              {team.map((poke) =>
                (poke.species != null) ?
                  <th className="text-center"
                    key={poke.species.species}
                    style={{width: 90/teamsize+"%"}}>
                      {poke.species.species}
                  </th>
                : null
              )}
            </tr>
          </thead>
          <tbody>
            {Object.keys(window.types).map((type) =>
              <DefenseType adv={this.state.adv}
                key={type}
                type={type}
                resists={defenseMatrix[type]}
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
      <DefenseTypeOverall type={props.type} adv={props.adv} resists={props.resists}/>
      {props.resists.map((val, index) => {
        return <DefenseTypeIndiv key={props.type+index} value={val} adv={props.adv}/>
      })}
    </tr>
  )
}

function DefenseTypeIndiv(props) {
  var color = "";
  var val = props.value;
  if (props.adv) {
    if (val === null)
      return null;
    if (val <= 0) {
      color = "success"
    } else if (val < 1) {
      color = "danger"
    } else if (val < 1.9) {
      color = "warning"
    } else if (val < 3) {
      color = "info"
    } else {
      color = "success"
    }
  } else {
    if (val === null)
      return null;
    if (val < 1)
      color = "success"
    if (val == 1)
      color = "info"
    if (val > 1)
      color = "danger"
  }
  return <td className={color + " text-center"}>{val}</td>
}

function DefenseTypeOverall(props) {
  var total = [0,0,0];
  for (var eff in props.resists) {
    var mul = props.resists[eff];
    if (mul == null) continue;
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
      if (mul == null) {
        // do nothing
      } else if (mul > 1) {
        total[0] += 1;
      } else if (mul < 1) {
        total[2] += 1;
        if (mul == 0) total[2] += 0.5; // immunities are super gud
      } else {
        total[1] += 1;
      }
    }
  }

  var messages = (props.adv) ? TYPE_MESSAGES.adv : TYPE_MESSAGES.base;
  var color, tip;
  console.log(total);
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
  } else if (total[2] > 1) {
    color = "success";
    tip = messages.strong;
  // no resists
  } else if (total[2] == 0) {
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
