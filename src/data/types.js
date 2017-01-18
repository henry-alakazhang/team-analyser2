/*
 * Types "database", yeah it's lazy
 */

window.types = {
    "Normal" : 0,
    "Fighting" : 1,
    "Flying" : 2,
    "Poison" : 3,
    "Ground" : 4,
    "Rock" : 5,
    "Bug": 6,
    "Ghost": 7,
    "Steel": 8,
    "Fire": 9,
    "Water": 10,
    "Grass": 11,
    "Electric": 12,
    "Psychic": 13,
    "Ice": 14,
    "Dragon": 15,
    "Dark": 16,
    "Fairy": 17
};

// 2d array, for speed ???
window.matchups = [[1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1],
[2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5],
[1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1],
[1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1,2],
[1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1],
[1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1],
[1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5],
[0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1],
[1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2],
[1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1],
[1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1],
[1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1],
[1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1],
[1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1],
[1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1],
[1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0],
[1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5],
[1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1]];

/*
function getTypeID(t) {
    if (t in types) {
        return types[t];
    } else {
        return -1;
    }
}
*/

/*
 * returns the effectiveness of an attacking type onto defensive type(s)
 * att is a type string, def is a [type string].
 */
window.getEffectiveness = function(att, def) {
  var ret = 1;
  for (var type in def) {
    ret *= window.matchups[window.types[att]][window.types[def[type]]];
  }
  return ret;
}

/*
 * returns a string representing a type combination, in a specific order
 * used to avoid duplicate type combinations in analysis
 */
window.getTypeCombo = function(types) {
  if (types.length == 1) return types[0];
  if (window.types[types[0]] < window.types[types[1]]) {
    return types[0] + "/" + types[1];
  } else {
    return types[1] + "/" + types[0];
  }
  return types[0];
}
