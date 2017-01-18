/*
 * Utility data manipulation functions that don't really fit anywhere else
 */

/*
 * Takes in some base stats and calculates a raw statistic from it.
 */
window.calculateStat = function(base, level, ev, iv, isHP=false) {
 if (isHP) {
   return ((2*base + iv + ev/4)*level/100) + level + 10;
 } else {
   return ((2*base + iv + ev/4)*level/100) + 5;
 }
}

/*
 * Takes in a move and two pokemon, and calculates damage.
 * Returns damage as a tuple, [%HP damage, hits to KO], unrounded
 * TODO: implement Psyshock, variable-power moves (gyro ball, grass knot, et al.)
 * TODO: implement offensive abilities
 */
window.calculateDamage = function(attacker, attackLvl, defender, defendLvl, move) {
  if (move == null || move.category == "Other" || move.bp === "--" || move.bp === 0)
    return Infinity;

  var att, def;
  if (move.category == "Physical") {
    att = window.calculateStat(attacker.species.baseStats.atk, attackLvl, 128, 30);
    def = window.calculateStat(defender.species.baseStats.def, defendLvl, 128, 30);
  } else {
    att = window.calculateStat(attacker.species.baseStats.spa, attackLvl, 128, 30);
    def = window.calculateStat(defender.species.baseStats.spd, defendLvl, 128, 30);
  }
  var hp = window.calculateStat(defender.species.baseStats.hp, defendLvl, 128, 30, true);

  var damage = (((2 * attackLvl + 10) / 250) * (att/def) * move.bp + 2) * window.getEffectiveness(move.type, defender.species.types);
  // STAB
  if (attacker.species.types.indexOf(move.type) >= 0)
    damage *= 1.5;
  // ability
  if (window.abilities[defender.ability].modifyEffectiveness)
    damage*= window.abilities[defender.ability].modifyEffectiveness(move.type, defender.types);
  // hard-coded fur coat
  if (defender.ability == "Fur Coat" && move.category == "Physical")
    damage*= 0.5;
  return hp/damage;
}