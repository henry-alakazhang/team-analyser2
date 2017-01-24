/*
 * Utility data manipulation functions that don't really fit anywhere else
 */

import { getEffectiveness } from './types.js'

/*
 * Takes in some base stats and calculates a raw statistic from it.
 */
function calculateStat(base, level, ev, iv, isHP=false) {
 if (isHP) {
   return ((2*base + iv + ev/4)*level/100) + level + 10;
 } else {
   return ((2*base + iv + ev/4)*level/100) + 5;
 }
}

/*
 * Takes in a move and two pokemon, and calculates damage.
 * Returns damage as number of hits to KO, unrounded
 * TODO: implement Psyshock, variable-power moves (gyro ball, grass knot, et al.)
 * TODO: implement offensive abilities
 */
function calculateDamage(attacker, attackLvl, defender, defendLvl, move) {
  if (move === null || move.category === "Other" || move.bp === 0)
    return Infinity;

  var att, def;
  if (move.category === "Physical") {
    att = calculateStat(attacker.species.baseStats.atk, attackLvl, 128, 30);
    def = calculateStat(defender.species.baseStats.def, defendLvl, 128, 30);
  } else {
    att = calculateStat(attacker.species.baseStats.spa, attackLvl, 128, 30);
    def = calculateStat(defender.species.baseStats.spd, defendLvl, 128, 30);
  }
  var hp = calculateStat(defender.species.baseStats.hp, defendLvl, 128, 30, true);

  // check for abilities that modify moves
  if (attacker.ability.modifyMove)
    move = attacker.ability.modifyMove(move);

  // hardcoded Scrappy - probably a better way TODO: find it
  var damage;
  if (attacker.ability.name === "Scrappy" && defender.species.types.indexOf("Ghost") >= 0 && (move.type === "Fighting" || move.type === "Normal")) {
    damage = (((2 * attackLvl + 10) / 250) * (att/def) * move.bp + 2)
  } else {
    damage = (((2 * attackLvl + 10) / 250) * (att/def) * move.bp + 2) * getEffectiveness(move.type, defender.species.types);
  }

  // multihit
  if (move.multihit) {
    if (move.multihit.length) {
      // variable multihit, hardcoded 2-5 since that's every multihit move
      damage *= 3.2; // (not actually) randomly generated number of hits
    } else {
      // set multihit
      damage *= move.multihit;
    }
  }

  // ability
  if (attacker.ability.modifyAttack)
    damage *= attacker.ability.modifyAttack(attacker, move, defender);
  if (defender.ability.modifyDefense && !attacker.ability.breaker)
    damage*= defender.ability.modifyDefense(attacker, move, defender);

  // item
  if (attacker.item && attacker.item.modifyAttack)
    damage *= attacker.item.modifyAttack(attacker, move, defender);
  if (defender.item && defender.item.modifyDefense)
    damage *= defender.item.modifyDefense(attacker, move, defender);

  // STAB
  if (attacker.species.types.indexOf(move.type) >= 0 || attacker.ability.name === "Protean")
    damage *= 1.5;

  return hp/damage;
}

export { calculateDamage }
