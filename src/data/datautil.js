/*
 * Utility data manipulation functions that don't really fit anywhere else
 */

import { abilities } from './abilities.js'
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
  if (move == null || move.category == "Other" || move.bp === "--" || move.bp === 0)
    return Infinity;

  var att, def;
  if (move.category == "Physical") {
    att = calculateStat(attacker.species.baseStats.atk, attackLvl, 128, 30);
    def = calculateStat(defender.species.baseStats.def, defendLvl, 128, 30);
  } else {
    att = calculateStat(attacker.species.baseStats.spa, attackLvl, 128, 30);
    def = calculateStat(defender.species.baseStats.spd, defendLvl, 128, 30);
  }
  var hp = calculateStat(defender.species.baseStats.hp, defendLvl, 128, 30, true);

  // check for abilities that modify moves
  if (attacker.ability && attacker.ability.modifyMove)
    move = attacker.ability.modifyMove(move);

  var damage = (((2 * attackLvl + 10) / 250) * (att/def) * move.bp + 2) * getEffectiveness(move.type, defender.species.types);
  // STAB
  if (attacker.species.types.indexOf(move.type) >= 0)
    damage *= 1.5;
  // ability
  if (defender.ability.modifyDefense)
    damage*= defender.ability.modifyDefense(move, defender.types);

  return hp/damage;
}

export { calculateDamage }
