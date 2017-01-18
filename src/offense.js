/*
 * offensive type analytics go here
 */

import React, { Component } from 'react';
import { Alert, Checkbox, Table, Button, Collapse, Well } from 'react-bootstrap';

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
      adv : false
    }
  }

  toggleAdvanced(e) {
    this.setState({adv : e.target.checked})
  }

  render() {
    // update offense matrix
    const categories = (this.state.adv) ? OFFENSE_CATEGORIES.adv : OFFENSE_CATEGORIES.base;
    var offenseMatrix = [];
    var teamsize = this.props.team.filter((poke) => poke.species != null && poke.moves.length > 0).length;
    if (teamsize == 0) return (
      <Alert>
        Enter team members with moves to get offensive analysis.
      </Alert>
    )

    for (var i = 0; i < 6; i++) {
      offenseMatrix[i] = null;
      // check if this mon has moves
      if (this.props.team[i].moves.length == 0)
        continue;

      offenseMatrix[i] = {};
      for (var m in categories)
        offenseMatrix[i][categories[m]] = [];

      if (this.state.adv) {

      } else {
        var typeArray = Object.keys(window.types);
        for (var t1 = 0; t1 < typeArray.length; t1++) {
          offenseMatrix[i][getPokeVsType(this.props.team[i], [typeArray[t1]]) + "x"].push(typeArray[t1]);
          for (var t2 = (t1+1); t2 < typeArray.length; t2++)  {
            var combo = window.getTypeCombo([typeArray[t1], typeArray[t2]]);
            if (window.pokedex_by_types[combo] != null) {
              offenseMatrix[i][getPokeVsType(this.props.team[i],[typeArray[t1],typeArray[t2]]) + "x"].push(combo);
            }
          }
        }
      }
    }

    return (
      <div>
        <div className="Checkbox">
          <Checkbox onClick={this.toggleAdvanced.bind(this)}>Toggle Advanced Analysis</Checkbox>
          <Collapse in={this.state.adv}>
            <div>
              nothing yet lul
            </div>
          </Collapse>
        </div>
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
                    (this.props.team[index].species != null && this.props.team[index].moves.length > 0) ?
                      <OffenseMatchup poke={poke} mult={c} key={index} />
                    : null
                  )}
                </tr>
              )}
            </tbody>
          </Table>
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
      case "1HKO" :
      case "2HKO" :
      case "4x" :
      case "2x" : buttonStyle = "success"; break;
      case "3HKO" :
      case "1x" : buttonStyle = "info"; break;
      case "4HKO" :
      case "0.5x" : buttonStyle = "warning"; break;
      case "5HKO" :
      case "0.25x" :
      case "0" : buttonStyle = "danger"; break;
      default: break;
    }
    return (
      <th className="text-center">
        <Button block bsStyle={buttonStyle} onClick={()=> this.setState({ open: !this.state.open })}>
          {this.props.poke[this.props.mult].length + " type combo(s)"}
          <br />
          {this.props.poke[this.props.mult].reduce((a, b) => a + window.pokedex_by_types[b].length, 0) + " Pokemon"}
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
