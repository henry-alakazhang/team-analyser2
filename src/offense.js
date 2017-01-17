/*
 * offensive type analytics go here
 */

import React, { Component } from 'react';
import { Table, Tooltip, OverlayTrigger, Button, Collapse, Well } from 'react-bootstrap';

class Offense extends Component {
  render() {
    // update offense matrix
    const OFFENSE_MULTS = [4, 2, 1, 0.5, 0.25, 0];
    var offenseMatrix = [];
    var teamsize = this.props.team.filter((poke) => poke.species != null && poke.moves.length > 0).length;
    for (var i = 0; i < 6; i++) {
      offenseMatrix[i] = null;
      // check if this mon has moves
      if (this.props.team[i].moves.length == 0)
        continue;

      offenseMatrix[i] = {};
      for (var m in OFFENSE_MULTS)
        offenseMatrix[i][OFFENSE_MULTS[m]] = [];

      var typeArray = Object.keys(window.types);
      for (var t1 = 0; t1 < typeArray.length; t1++) {
        offenseMatrix[i][getPokeVsType(this.props.team[i], [typeArray[t1]])].push(typeArray[t1]);
        for (var t2 = (t1+1); t2 < typeArray.length; t2++)  {
          offenseMatrix[i][getPokeVsType(this.props.team[i],[typeArray[t1],typeArray[t2]])].push(typeArray[t1] + "/" + typeArray[t2]);
        }
      }
    }

    console.log(offenseMatrix);
    return (
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
          {OFFENSE_MULTS.map((mult) =>
            <tr key={mult}>
              <th>{mult + "x effective"}</th>
              {offenseMatrix.map((poke, index) =>
                (this.props.team[index].species != null && this.props.team[index].moves.length > 0) ?
                  <OffenseMatchup poke={poke} mult={mult} key={index} />
                : null
              )}
            </tr>
          )}
        </tbody>
      </Table>
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
    return (
      <th className="text-center">
        <Button onClick={()=> this.setState({ open: !this.state.open })}>
          {this.props.poke[this.props.mult].length + " type combo(s)"}
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              {this.props.poke[this.props.mult].map((combo) =>
                <div>{combo}</div>
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
 * returns:
 *   1 if the pokemon can hit super effectively
 *   0 if the pokemon can only hit neutrally
 *   -1 if the pokemon gets walled
 */
function getPokeVsType(poke, def) {
    var max = 0;
    for (var m in poke.moves) {
        var move = poke.moves[m];
        if (move == null)
            continue;
        if (move.category == "other")
            continue;
        if (window.getEffectiveness(move.type, def) >= max)
            max = window.getEffectiveness(move.type, def);
    }
    return max;
}

export default Offense;
