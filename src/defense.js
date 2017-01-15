/*
 * All the type analytics go here
 */
import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

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

  /* Defensive type analysis
   * Type effectiveness only
   */
  render() {
    // update defense matrix
    var team = this.props.team;
    var defenseMatrix = {};
    for (var type in window.types) {
        defenseMatrix[type] = [];
        for (var i = 0; i < 6; i++) {
            defenseMatrix[type][i] = 0;
        }
    }
    for (var type in window.types) {
      for (var i = 0; i < 6; i ++) {
        var poke = team[i];
        if (poke.species != null) {
          defenseMatrix[type][i] = window.getEffectiveness(type, poke.species.types);
          // if (team[i].ability && window.abilities[team[i].ability].modifyEffectiveness) {
          //   defenseMatrix[type][i] *= window.abilities[team[i].ability]
          //                            .modifyEffectiveness(type, poke.types);
          // } else {
          //   defenseMatrix[type][i] = 0;
          // }
        } else {
          defenseMatrix[type][i] = 1;
        }
      }
    }

    return (
      <table id="typetable-def" className="table table-striped">
        <thead id="typetable-head">
          <tr>
            <th style={{width:"10%"}}></th>
            {team.map((poke) =>
              (poke.species != null) ? <th style={{width:"15%"}}>{poke.species.species}</th> : <div></div>
            )}
          </tr>
        </thead>
        <tbody>
          {Object.keys(window.types).map((type) => <DefenseType type={type} resists={defenseMatrix[type]} />)}
        </tbody>
      </table>
    );

    // for (type in defenseMatrix) {
    //     var row = $('<tr>');
    //     var typeHeader = $('<td>', {
    //         'data-toggle': "tooltip",
    //         'data-placement' : "top",
    //         'data-container' : "body"
    //     }).append(type);
    //     row.append(typeHeader);
    //     // [weak,neutral,strong];
    //     var total = [0,0,0];
    //     // display and color individual Pokemon type matchups
    //     for (mon in defenseMatrix[type]) {
    //         var col = $('<td>').append(Math.round(defenseMatrix[type][mon] * 100) / 100);
    //         if ($("#pokemon-selector-" + mon).val()) { // only colour if pokemon team exists
    //             eff = defenseMatrix[type][mon];
    //             /* advanced mode */
    //             if ($('#advdef-checkbox').is(':checked')) {
    //                 if (eff < 0) {
    //                     // immunity or absorption
    //                     total[2] += 1.5;
    //                     col.addClass('success');
    //                 } else if (eff < 1) {
    //                     // one hit KO
    //                     total[0] += 1.5;
    //                     col.addClass('danger');
    //                 } else if (eff < 1.9) {
    //                     // guaranteed two hit KO through lefties
    //                     total[0] += 1;
    //                     col.addClass('warning');
    //                 } else if (eff < 3) {
    //                     // three hit KO
    //                     total[1] += 1;
    //                     col.addClass('info');
    //                 } else {
    //                     // four hit or better
    //                     total[2] += 1;
    //                     col.addClass('success');
    //                 }
    //             } else {
    //             /* not advanced mode */
    //                 if (eff > 1) {
    //                     total[0] += 1;
    //                     col.addClass('danger');
    //                 } else if (eff < 1) {
    //                     total[2] += 1;
    //                     if (eff == 0) total[2] += 0.5; // immunities are super gud
    //                     col.addClass('success');
    //                 } else {
    //                     total[1] += 1;
    //                     col.addClass('info');
    //                 }
    //             }
    //         }
    //         row.append(col);
    //     }
    //     // display and color the entire team's type analysis
    //     var messages;
    //     if ($('#advdef-checkbox').is(':checked')) {
    //         messages = TYPE_MESSAGES.adv;
    //     } else {
    //         messages = TYPE_MESSAGES.base;
    //     }
    //     if (total[0] > 2.5) {
    //         // lots of weaknesses ...
    //         if (total[2] > 1.5) {
    //             // ... but lot of resistances
    //             typeHeader.addClass('warning');
    //             typeHeader.attr('title', messages.danger);
    //         } else {
    //             // ... and nothing else
    //             typeHeader.addClass('danger');
    //             typeHeader.attr('title', messages.weak);
    //         }
    //     } else if (total[2] > 1) {
    //         // few weaknesses and enough resistances
    //         typeHeader.addClass('success');
    //         typeHeader.attr('title', messages.strong);
    //     } else if (total[2] == 0) {
    //         if (total[0] > 1) {
    //             // still a couple of weaknesses but no resistances
    //             typeHeader.addClass('danger');
    //             typeHeader.attr('title', messages.weakish);
    //         } else {
    //             // only slightly weak
    //             typeHeader.addClass('warning');
    //             typeHeader.attr('title', messages.notank);
    //         }
    //     } else {
    //         // mostly neutral
    //         typeHeader.addClass('info');
    //         typeHeader.attr('title', messages.neutral);
    //     }
    //     typeHeader.tooltip();
    //     $("#typetable-body").append(row);
    // }
  }
}

function DefenseType(props) {
  return (
    <tr>
      <DefenseTypeOverall type={props.type} resists={props.resists}/>
      {props.resists.map((val) => {
        if (val < 1)
          return <td className="success">{val}</td>
        if (val == 1)
          return <td className="info">{val}</td>
        if (val > 1)
          return <td className="danger">{val}</td>
      })}
    </tr>
  )
}

function DefenseTypeOverall(props) {
  var total = [0,0,0];
  for (var eff in props.resists) {
    if (props.resists[eff] > 1) {
      total[0] += 1;
    } else if (props.resists[eff] < 1) {
      total[2] += 1;
      if (props.resists[eff] == 0) total[2] += 0.5; // immunities are super gud
    } else {
      total[1] += 1;
    }
  }

  console.log(total, props.resists)

  var messages = TYPE_MESSAGES.base;
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
    <OverlayTrigger placement="top" overlay={<Tooltip>{tip}</Tooltip>}>
      <td className={color}>{props.type}</td>
    </OverlayTrigger>
  )
}

export default Defense;
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
  //                 var stats = pokedex[poke]["baseStats"];
  //                 if ($('#phys-radio').is(':checked')) {
  //                     var def = ((30 + (2*stats.def) + 20)/2) + 5;
  //                 } else {
  //                     var def = ((30 + (2*stats.spd) + 20)/2) + 5;
  //                 }
  //                 var hp = ((30 + 2*stats.hp + 20)/2) + 60
  //                 var damage = (((2 * 50 + 10) / 250) * (att/def) * pow + 2) * getEffectiveness(type, pokedex[poke].types) * 1.5;
  //                 defenseMatrix[type][i] = (damage != 0) ? hp/damage : 0; //defenseMatrix values are nHKO
  //                 if (abilities[team[i].ability].modifyEffectiveness)
  //                     defenseMatrix[type][i] *= abilities[team[i].ability]
  //                                                .modifyEffectiveness(type, pokedex[poke].types);
  //             } else {
  //                 defenseMatrix[type][i] = 0;
  //             }
  //         }
  //     }
  // }
