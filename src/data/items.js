
import { getEffectiveness } from './types.js'
import { pokedex } from './pokedex.js'

var items = {
  "Abomasite": {
    name: "Abomasite",
    megaStone: "Abomasnow-Mega",
    megaEvolves: "Abomasnow",
    desc: "If holder is an Abomasnow, this item allows it to Mega Evolve in battle.",
  },
  "Absolite": {
    name: "Absolite",
    megaStone: "Absol-Mega",
    megaEvolves: "Absol",
    desc: "If holder is an Absol, this item allows it to Mega Evolve in battle.",
  },
  "Absorb Bulb": {
    name: "Absorb Bulb",
    fling: 30,
    desc: "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack. Single use.",
  },
  "Adamant Orb": {
    name: "Adamant Orb",
    fling: 60,
    onBasePowerPriority: 6,
    desc: "If holder is a Dialga, its Steel- and Dragon-type attacks have 1.2x power.",
    modifyAttack: function(attacker, move, defender) {
      if (attacker.species.num === pokedex.dialga.num && (move.type === "Steel" || move.type === "Dragon"))
        return 1.2;
      return 1;
    }
  },
  "Adrenaline Orb": {
    name: "Adrenaline Orb",
    fling: 30,
  },
  "Aerodactylite": {
    name: "Aerodactylite",
    megaStone: "Aerodactyl-Mega",
    megaEvolves: "Aerodactyl",
    desc: "If holder is an Aerodactyl, this item allows it to Mega Evolve in battle.",
  },
  "Aggronite": {
    name: "Aggronite",
    megaStone: "Aggron-Mega",
    megaEvolves: "Aggron",
    desc: "If holder is an Aggron, this item allows it to Mega Evolve in battle.",
  },
  "Aguav Berry": {
    name: "Aguav Berry",
    desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
  },
  "Air Balloon": {
    name: "Air Balloon",
    fling: 10,
    desc: "Holder is immune to Ground-type attacks. Pops when holder is hit.",
    modifyDefense: function(attacker, move, defender) {
      if (move.type === "Ground")
        return 0;
      return 1;
    }
  },
  "Alakazite": {
    name: "Alakazite",
    megaStone: "Alakazam-Mega",
    megaEvolves: "Alakazam",
    desc: "If holder is an Alakazam, this item allows it to Mega Evolve in battle.",
  },
  "Aloraichium Z": {
    name: "Aloraichium Z",
    onTakeItem: false,
    zMove: "Stoked Sparksurfer",
    zMoveFrom: "Thunderbolt",
    zMoveUser: ["Raichu-Alola"],
    desc: "If holder is an Alolan Raichu with Thunderbolt, it can use Stoked Sparksurfer.",
  },
  "Altarianite": {
    name: "Altarianite",
    megaStone: "Altaria-Mega",
    megaEvolves: "Altaria",
    desc: "If holder is an Altaria, this item allows it to Mega Evolve in battle.",
  },
  "Ampharosite": {
    name: "Ampharosite",
    megaStone: "Ampharos-Mega",
    megaEvolves: "Ampharos",
    desc: "If holder is an Ampharos, this item allows it to Mega Evolve in battle.",
  },
  "Apicot Berry": {
    name: "Apicot Berry",
    desc: "Raises holder's Sp. Def by 1 stage when at 1/4 max HP or less. Single use.",
  },
  "Armor Fossil": {
    name: "Armor Fossil",
    fling: 100,
    desc: "Can be revived into Shieldon.",
  },
  "Aspear Berry": {
    name: "Aspear Berry",
    desc: "Holder is cured if it is frozen. Single use.",
  },
  "Assault Vest": {
    name: "Assault Vest",
    fling: 80,
    onModifySpDPriority: 1,
    desc: "Holder's Sp. Def is 1.5x, but it can only select damaging moves.",
    modifyDefense : function(attacker, move, defender) {
      if (move.category === "Special")
        return 0.67;
      return 1;
    }
  },
  "Audinite": {
    name: "Audinite",
    megaStone: "Audino-Mega",
    megaEvolves: "Audino",
    desc: "If holder is an Audino, this item allows it to Mega Evolve in battle.",
  },
  "Babiri Berry": {
    name: "Babiri Berry",
    desc: "Halves damage taken from a supereffective Steel-type attack. Single use.",
    // TODO: might?
  },
  "Banettite": {
    name: "Banettite",
    megaStone: "Banette-Mega",
    megaEvolves: "Banette",
    desc: "If holder is a Banette, this item allows it to Mega Evolve in battle.",
  },
  "Beast Ball": {
    name: "Beast Ball",
    desc: "A special Poke Ball designed to catch Ultra Beasts.",
  },
  "Beedrillite": {
    name: "Beedrillite",
    megaStone: "Beedrill-Mega",
    megaEvolves: "Beedrill",
    desc: "If holder is a Beedrill, this item allows it to Mega Evolve in battle.",
  },
  "Belue Berry": {
    name: "Belue Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Berry Juice": {
    name: "Berry Juice",
    fling: 30,
    desc: "Restores 20 HP when at 1/2 max HP or less. Single use.",
  },
  "Big Root": {
    name: "Big Root",
    fling: 10,
    onTryHealPriority: 1,
    desc: "Holder gains 1.3x HP from draining moves, Aqua Ring, Ingrain, and Leech Seed.",
  },
  "Binding Band": {
    name: "Binding Band",
    fling: 30,
    desc: "Holder's partial-trapping moves deal 1/6 max HP per turn instead of 1/8.",
  },
  "Black Belt": {
    name: "Black Belt",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Fighting-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Fighting")
        return 1.2;
      return 1;
    }
  },
  "Black Sludge": {
    name: "Black Sludge",
    fling: 30,
    desc: "Each turn, if holder is a Poison type, restores 1/16 max HP; loses 1/8 if not.",
  },
  "Black Glasses": {
    name: "Black Glasses",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Dark-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Dark")
        return 1.2;
      return 1;
    }
  },
  "Blastoisinite": {
    name: "Blastoisinite",
    megaStone: "Blastoise-Mega",
    megaEvolves: "Blastoise",
    desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle.",
  },
  "Blazikenite": {
    name: "Blazikenite",
    megaStone: "Blaziken-Mega",
    megaEvolves: "Blaziken",
    desc: "If holder is a Blaziken, this item allows it to Mega Evolve in battle.",
  },
  "Blue Orb": {
    name: "Blue Orb",
    desc: "If holder is a Kyogre, this item triggers its Primal Reversion in battle.",
  },
  "Bluk Berry": {
    name: "Bluk Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "BrightPowder": {
    name: "BrightPowder",
    fling: 10,
    desc: "The accuracy of attacks against the holder is 0.9x.",
  },
  "Bug Gem": {
    name: "Bug Gem",
    desc: "Holder's first successful Bug-type attack will have 1.3x power. Single use.",
  },
  "Bug Memory": {
    name: "Bug Memory",
    onMemory: 'Bug',
    forcedForme: "Silvally-Bug",
    desc: "Holder's Multi-Attack is Bug type.",
  },
  "Buginium Z": {
    name: "Buginium Z",
    onPlate: 'Bug',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Bug",
    forcedForme: "Arceus-Bug",
    desc: "If holder has a Bug move, this item allows it to use a Bug Z-Move.",
  },
  "Burn Drive": {
    name: "Burn Drive",
    onDrive: 'Fire',
    forcedForme: "Genesect-Burn",
    desc: "Holder's Techno Blast is Fire type.",
  },
  "Cameruptite": {
    name: "Cameruptite",
    megaStone: "Camerupt-Mega",
    megaEvolves: "Camerupt",
    desc: "If holder is a Camerupt, this item allows it to Mega Evolve in battle.",
  },
  "Cell Battery": {
    name: "Cell Battery",
    fling: 30,
    desc: "Raises holder's Attack by 1 if hit by an Electric-type attack. Single use.",
  },
  "Charcoal": {
    name: "Charcoal",
    fling: 30,
    desc: "Holder's Fire-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Fire")
        return 1.2;
      return 1;
    }
  },
  "Charizardite X": {
    name: "Charizardite X",
    megaStone: "Charizard-Mega-X",
    megaEvolves: "Charizard",
    desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle.",
  },
  "Charizardite Y": {
    name: "Charizardite Y",
    megaStone: "Charizard-Mega-Y",
    megaEvolves: "Charizard",
    desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle.",
  },
  "Charti Berry": {
    name: "Charti Berry",
    desc: "Halves damage taken from a supereffective Rock-type attack. Single use.",
  },
  "Cheri Berry": {
    name: "Cheri Berry",
    desc: "Holder cures itself if it is paralyzed. Single use.",
  },
  "Cherish Ball": {
    name: "Cherish Ball",
    desc: "A rare Poke Ball that has been crafted to commemorate an occasion.",
  },
  "Chesto Berry": {
    name: "Chesto Berry",
    desc: "Holder wakes up if it is asleep. Single use.",
  },
  "Chilan Berry": {
    name: "Chilan Berry",
    desc: "Halves damage taken from a Normal-type attack. Single use.",
  },
  "Chill Drive": {
    name: "Chill Drive",
    onDrive: 'Ice',
    forcedForme: "Genesect-Chill",
    desc: "Holder's Techno Blast is Ice type.",
  },
  "Choice Band": {
    name: "Choice Band",
    fling: 10,
    onModifyAtkPriority: 1,
    isChoice: true,
    desc: "Holder's Attack is 1.5x, but it can only select the first move it executes.",
    modifyAttack : function(attacker, move, defender) {
      if (move.category === "Physical")
        return 1.5;
      return 1;
    }
  },
  "Choice Scarf": {
    name: "Choice Scarf",
    fling: 10,
    isChoice: true,
    desc: "Holder's Speed is 1.5x, but it can only select the first move it executes.",
  },
  "Choice Specs": {
    name: "Choice Specs",
    fling: 10,
    onModifySpAPriority: 1,
    isChoice: true,
    desc: "Holder's Sp. Atk is 1.5x, but it can only select the first move it executes.",
    modifyAttack : function(attacker, move, defender) {
      if (move.category === "Special")
        return 1.5;
      return 1;
    }
  },
  "Chople Berry": {
    name: "Chople Berry",
    desc: "Halves damage taken from a supereffective Fighting-type attack. Single use.",
  },
  "Claw Fossil": {
    name: "Claw Fossil",
    fling: 100,
    desc: "Can be revived into Anorith.",
  },
  "Coba Berry": {
    name: "Coba Berry",
    desc: "Halves damage taken from a supereffective Flying-type attack. Single use.",
  },
  "Colbur Berry": {
    name: "Colbur Berry",
    desc: "Halves damage taken from a supereffective Dark-type attack. Single use.",
  },
  "Cornn Berry": {
    name: "Cornn Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Cover Fossil": {
    name: "Cover Fossil",
    fling: 100,
    desc: "Can be revived into Tirtouga.",
  },
  "Custap Berry": {
    name: "Custap Berry",
    onModifyPriorityPriority: -1,
    desc: "Holder moves first in its priority bracket when at 1/4 max HP or less. Single use.",
  },
  "Damp Rock": {
    name: "Damp Rock",
    fling: 60,
    desc: "Holder's use of Rain Dance lasts 8 turns instead of 5.",
  },
  "Dark Gem": {
    name: "Dark Gem",
    isGem: true,
    desc: "Holder's first successful Dark-type attack will have 1.3x power. Single use.",
  },
  "Dark Memory": {
    name: "Dark Memory",
    onMemory: 'Dark',
    forcedForme: "Silvally-Dark",
    desc: "Holder's Multi-Attack is Dark type.",
  },
  "Darkinium Z": {
    name: "Darkinium Z",
    onPlate: 'Dark',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Dark",
    forcedForme: "Arceus-Dark",
    desc: "If holder has a Dark move, this item allows it to use a Dark Z-Move.",
  },
  "Decidium Z": {
    name: "Decidium Z",
    spritenum: 650,
    onTakeItem: false,
    zMove: "Sinister Arrow Raid",
    zMoveFrom: "Spirit Shackle",
    zMoveUser: ["Decidueye"],
    desc: "If holder is a Decidueye with Spirit Shackle, it can use Sinister Arrow Raid.",
  },
  "DeepSeaScale": {
    name: "DeepSeaScale",
    fling: 30,
    onModifySpDPriority: 2,
    desc: "If holder is a Clamperl, its Sp. Def is doubled.",
    modifyDefense : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.clamperl.num)
        return 0.5;
      return 1;
    }
  },
  "DeepSeaTooth": {
    name: "DeepSeaTooth",
    fling: 90,
    onModifySpAPriority: 1,
    desc: "If holder is a Clamperl, its Sp. Atk is doubled.",
    modifyAttack : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.clamperl.num)
        return 2;
      return 1;
    }
  },
  "Destiny Knot": {
    name: "Destiny Knot",
    fling: 10,
    onAttractPriority: -100,
    desc: "If holder becomes infatuated, the other Pokemon also becomes infatuated.",
  },
  "Diancite": {
    name: "Diancite",
    megaStone: "Diancie-Mega",
    megaEvolves: "Diancie",
    desc: "If holder is a Diancie, this item allows it to Mega Evolve in battle.",
  },
  "Dive Ball": {
    name: "Dive Ball",
    desc: "A Poke Ball that works especially well on Pokemon that live underwater.",
  },
  "Dome Fossil": {
    name: "Dome Fossil",
    fling: 100,
    desc: "Can be revived into Kabuto.",
  },
  "Douse Drive": {
    name: "Douse Drive",
    onDrive: 'Water',
    forcedForme: "Genesect-Douse",
    desc: "Holder's Techno Blast is Water type.",
  },
  "Draco Plate": {
    name: "Draco Plate",
    onPlate: 'Dragon',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Dragon",
    desc: "Holder's Dragon-type attacks have 1.2x power. Judgment is Dragon type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Dragon")
        return 1.2;
      return 1;
    }
  },
  "Dragon Fang": {
    name: "Dragon Fang",
    fling: 70,
    onBasePowerPriority: 6,
    desc: "Holder's Dragon-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Dragon")
        return 1.2;
      return 1;
    }
  },
  "Dragon Gem": {
    name: "Dragon Gem",
    isGem: true,
    desc: "Holder's first successful Dragon-type attack will have 1.3x power. Single use.",
  },
  "Dragon Memory": {
    name: "Dragon Memory",
    onMemory: 'Dragon',
    forcedForme: "Silvally-Dragon",
    desc: "Holder's Multi-Attack is Dragon type.",
  },
  "Dragonium Z": {
    name: "Dragonium Z",
    onPlate: 'Dragon',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Dragon",
    forcedForme: "Arceus-Dragon",
    desc: "If holder has a Dragon move, this item allows it to use a Dragon Z-Move.",
  },
  "Dread Plate": {
    name: "Dread Plate",
    onPlate: 'Dark',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Dark",
    desc: "Holder's Dark-type attacks have 1.2x power. Judgment is Dark type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Dark")
        return 1.2;
      return 1;
    }
  },
  "Dream Ball": {
    name: "Dream Ball",
    desc: "A special Poke Ball that appears out of nowhere in a bag at the Entree Forest.",
  },
  "Durin Berry": {
    name: "Durin Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Dusk Ball": {
    name: "Dusk Ball",
    desc: "A Poke Ball that makes it easier to catch wild Pokemon at night or in caves.",
  },
  "Earth Plate": {
    name: "Earth Plate",
    onPlate: 'Ground',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Ground",
    desc: "Holder's Ground-type attacks have 1.2x power. Judgment is Ground type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Ground")
        return 1.2;
      return 1;
    }
  },
  "Eevium Z": {
    name: "Eevium Z",
    onTakeItem: false,
    zMove: "Extreme Evoboost",
    zMoveFrom: "Last Resort",
    zMoveUser: ["Eevee"],
    desc: "If holder is an Eevee with Last Resort, it can use Extreme Evoboost.",
  },
  "Eject Button": {
    name: "Eject Button",
    fling: 30,
    onAfterMoveSecondaryPriority: 2,
    desc: "If holder survives a hit, it immediately switches out to a chosen ally. Single use.",
  },
  "Electirizer": {
    name: "Electirizer",
    fling: 80,
    desc: "Evolves Electabuzz into Electivire when traded.",
  },
  "Electric Gem": {
    name: "Electric Gem",
    isGem: true,
    desc: "Holder's first successful Electric-type attack will have 1.3x power. Single use.",
  },
  "Electric Memory": {
    name: "Electric Memory",
    onMemory: 'Electric',
    forcedForme: "Silvally-Electric",
    desc: "Holder's Multi-Attack is Electric type.",
  },
  "Electric Seed": {
    name: "Electric Seed",
    fling: 10,
    desc: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use.",
  },
  "Electrium Z": {
    name: "Electrium Z",
    onPlate: 'Electric',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Electric",
    forcedForme: "Arceus-Electric",
    desc: "If holder has an Electric move, this item allows it to use an Electric Z-Move.",
  },
  "Energy Powder": {
    name: "Energy Powder",
    fling: 30,
    desc: "Restores 50 HP to one Pokemon but lowers Happiness.",
  },
  "Enigma Berry": {
    name: "Enigma Berry",
    desc: "Restores 1/4 max HP after holder is hit by a supereffective move. Single use.",
  },
  "Eviolite": {
    name: "Eviolite",
    fling: 40,
    onModifyDefPriority: 2,
    onModifySpDPriority: 2,
    desc: "If holder's species can evolve, its Defense and Sp. Def are 1.5x.",
    modifyDefense : function(attacker, move, defender) {
      if (attacker.species.evos)
        return 0.67;
      return 1;
    }
  },
  "Expert Belt": {
    name: "Expert Belt",
    fling: 10,
    desc: "Holder's attacks that are super effective against the target do 1.2x damage.",
    modifyAttack : function(attacker, move, defender) {
      if (getEffectiveness(move, defender.species.types) > 1)
        return 1.2;
      return 1;
    }
  },
  "Fairium Z": {
    name: "Fairium Z",
    onPlate: 'Fairy',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Fairy",
    forcedForme: "Arceus-Fairy",
    desc: "If holder has a Fairy move, this item allows it to use a Fairy Z-Move.",
  },
  "Fairy Gem": {
    name: "Fairy Gem",
    isGem: true,
    desc: "Holder's first successful Fairy-type attack will have 1.3x power. Single use.",
  },
  "Fairy Memory": {
    name: "Fairy Memory",
    onMemory: 'Fairy',
    forcedForme: "Silvally-Fairy",
    desc: "Holder's Multi-Attack is Fairy type.",
  },
  "Fast Ball": {
    name: "Fast Ball",
    desc: "A Poke Ball that makes it easier to catch Pokemon which are quick to run away.",
  },
  "Fighting Gem": {
    name: "Fighting Gem",
    isGem: true,
    desc: "Holder's first successful Fighting-type attack will have 1.3x power. Single use.",
  },
  "Fighting Memory": {
    name: "Fighting Memory",
    onMemory: 'Fighting',
    forcedForme: "Silvally-Fighting",
    desc: "Holder's Multi-Attack is Fighting type.",
  },
  "Fightinium Z": {
    name: "Fightinium Z",
    onPlate: 'Fighting',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Fighting",
    forcedForme: "Arceus-Fighting",
    desc: "If holder has a Fighting move, this item allows it to use a Fighting Z-Move.",
  },
  "Figy Berry": {
    name: "Figy Berry",
    desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
  },
  "Fire Gem": {
    name: "Fire Gem",
    isGem: true,
    desc: "Holder's first successful Fire-type attack will have 1.3x power. Single use.",
  },
  "Fire Memory": {
    name: "Fire Memory",
    onMemory: 'Fire',
    forcedForme: "Silvally-Fire",
    desc: "Holder's Multi-Attack is Fire type.",
  },
  "Firium Z": {
    name: "Firium Z",
    onPlate: 'Fire',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Fire",
    forcedForme: "Arceus-Fire",
    desc: "If holder has a Fire move, this item allows it to use a Fire Z-Move.",
  },
  "Fist Plate": {
    name: "Fist Plate",
    onPlate: 'Fighting',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Fighting",
    desc: "Holder's Fighting-type attacks have 1.2x power. Judgment is Fighting type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Fighting")
        return 1.2;
      return 1;
    }
  },
  "Flame Orb": {
    name: "Flame Orb",
    fling: 30,
    desc: "At the end of every turn, this item attempts to burn the holder.",
  },
  "Flame Plate": {
    name: "Flame Plate",
    onPlate: 'Fire',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Fire",
    desc: "Holder's Fire-type attacks have 1.2x power. Judgment is Fire type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Fire")
        return 1.2;
      return 1;
    }
  },
  "Float Stone": {
    name: "Float Stone",
    fling: 30,
    desc: "Holder's weight is halved.",
  },
  "Flying Gem": {
    name: "Flying Gem",
    isGem: true,
    desc: "Holder's first successful Flying-type attack will have 1.3x power. Single use.",
  },
  "Flying Memory": {
    name: "Flying Memory",
    onMemory: 'Flying',
    forcedForme: "Silvally-Flying",
    desc: "Holder's Multi-Attack is Flying type.",
  },
  "Flyinium Z": {
    name: "Flyinium Z",
    onPlate: 'Flying',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Flying",
    forcedForme: "Arceus-Flying",
    desc: "If holder has a Flying move, this item allows it to use a Flying Z-Move.",
  },
  "Focus Band": {
    name: "Focus Band",
    fling: 10,
    desc: "Holder has a 10% chance to survive an attack that would KO it with 1 HP.",
  },
  "Focus Sash": {
    name: "Focus Sash",
    fling: 10,
    desc: "If holder's HP is full, will survive an attack that would KO it with 1 HP. Single use.",
  },
  "Friend Ball": {
    name: "Friend Ball",
    desc: "A Poke Ball that makes caught Pokemon more friendly.",
  },
  "Full Incense": {
    name: "Full Incense",
    fling: 10,
    desc: "Holder moves last in its priority bracket.",
  },
  "Galladite": {
    name: "Galladite",
    megaStone: "Gallade-Mega",
    megaEvolves: "Gallade",
    desc: "If holder is a Gallade, this item allows it to Mega Evolve in battle.",
  },
  "Ganlon Berry": {
    name: "Ganlon Berry",
    desc: "Raises holder's Defense by 1 stage when at 1/4 max HP or less. Single use.",
  },
  "Garchompite": {
    name: "Garchompite",
    megaStone: "Garchomp-Mega",
    megaEvolves: "Garchomp",
    desc: "If holder is a Garchomp, this item allows it to Mega Evolve in battle.",
  },
  "Gardevoirite": {
    name: "Gardevoirite",
    megaStone: "Gardevoir-Mega",
    megaEvolves: "Gardevoir",
    desc: "If holder is a Gardevoir, this item allows it to Mega Evolve in battle.",
  },
  "Gengarite": {
    name: "Gengarite",
    megaStone: "Gengar-Mega",
    megaEvolves: "Gengar",
    desc: "If holder is a Gengar, this item allows it to Mega Evolve in battle.",
  },
  "Ghost Gem": {
    name: "Ghost Gem",
    isGem: true,
    desc: "Holder's first successful Ghost-type attack will have 1.3x power. Single use.",
  },
  "Ghost Memory": {
    name: "Ghost Memory",
    onMemory: 'Ghost',
    forcedForme: "Silvally-Ghost",
    desc: "Holder's Multi-Attack is Ghost type.",
  },
  "Ghostium Z": {
    name: "Ghostium Z",
    onPlate: 'Ghost',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Ghost",
    forcedForme: "Arceus-Ghost",
    desc: "If holder has a Ghost move, this item allows it to use a Ghost Z-Move.",
  },
  "Glalitite": {
    name: "Glalitite",
    megaStone: "Glalie-Mega",
    megaEvolves: "Glalie",
    desc: "If holder is a Glalie, this item allows it to Mega Evolve in battle.",
  },
  "Grass Gem": {
    name: "Grass Gem",
    isGem: true,
    desc: "Holder's first successful Grass-type attack will have 1.3x power. Single use.",
  },
  "Grass Memory": {
    name: "Grass Memory",
    onMemory: 'Grass',
    forcedForme: "Silvally-Grass",
    desc: "Holder's Multi-Attack is Grass type.",
  },
  "Grassium Z": {
    name: "Grassium Z",
    onPlate: 'Grass',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Grass",
    forcedForme: "Arceus-Grass",
    desc: "If holder has a Grass move, this item allows it to use a Grass Z-Move.",
  },
  "Grassy Seed": {
    name: "Grassy Seed",
    fling: 10,
    desc: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use.",
  },
  "Great Ball": {
    name: "Great Ball",
  },
  "Grepa Berry": {
    name: "Grepa Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Grip Claw": {
    name: "Grip Claw",
    fling: 90,
    desc: "Holder's partial-trapping moves always last 7 turns.",
  },
  "Griseous Orb": {
    name: "Griseous Orb",
    fling: 60,
    onBasePowerPriority: 6,
    forcedForme: "Giratina-Origin",
    desc: "If holder is a Giratina, its Ghost- and Dragon-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.giratina.num && (move.type === "Ghost" || move.type === "Dragon"))
        return 1.2;
      return 1;
    }
  },
  "Ground Gem": {
    name: "Ground Gem",
    isGem: true,
    desc: "Holder's first successful Ground-type attack will have 1.3x power. Single use.",
  },
  "Ground Memory": {
    name: "Ground Memory",
    onMemory: 'Ground',
    forcedForme: "Silvally-Ground",
    desc: "Holder's Multi-Attack is Ground type.",
  },
  "Groundium Z": {
    name: "Groundium Z",
    onPlate: 'Ground',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Ground",
    forcedForme: "Arceus-Ground",
    desc: "If holder has a Ground move, this item allows it to use a Ground Z-Move.",
  },
  "Gyaradosite": {
    name: "Gyaradosite",
    megaStone: "Gyarados-Mega",
    megaEvolves: "Gyarados",
    desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle.",
  },
  "Haban Berry": {
    name: "Haban Berry",
    desc: "Halves damage taken from a supereffective Dragon-type attack. Single use.",
  },
  "Hard Stone": {
    name: "Hard Stone",
    fling: 100,
    onBasePowerPriority: 6,
    desc: "Holder's Rock-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Rock")
        return 1.2;
      return 1;
    }
  },
  "Heal Ball": {
    name: "Heal Ball",
    desc: "A remedial Poke Ball that restores the caught Pokemon's HP and status problem.",
  },
  "Heat Rock": {
    name: "Heat Rock",
    fling: 60,
    desc: "Holder's use of Sunny Day lasts 8 turns instead of 5.",
  },
  "Heavy Ball": {
    name: "Heavy Ball",
    desc: "A Poke Ball for catching very heavy Pokemon.",
  },
  "Helix Fossil": {
    name: "Helix Fossil",
    fling: 100,
    desc: "Can be revived into Omanyte.",
  },
  "Heracronite": {
    name: "Heracronite",
    megaStone: "Heracross-Mega",
    megaEvolves: "Heracross",
    desc: "If holder is a Heracross, this item allows it to Mega Evolve in battle.",
  },
  "Hondew Berry": {
    name: "Hondew Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Houndoominite": {
    name: "Houndoominite",
    megaStone: "Houndoom-Mega",
    megaEvolves: "Houndoom",
    desc: "If holder is a Houndoom, this item allows it to Mega Evolve in battle.",
  },
  "Iapapa Berry": {
    name: "Iapapa Berry",
    desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
  },
  "Ice Gem": {
    name: "Ice Gem",
    isGem: true,
    desc: "Holder's first successful Ice-type attack will have 1.3x power. Single use.",
  },
  "Ice Memory": {
    name: "Ice Memory",
    onMemory: 'Ice',
    forcedForme: "Silvally-Ice",
    desc: "Holder's Multi-Attack is Ice type.",
  },
  "Icicle Plate": {
    name: "Icicle Plate",
    onPlate: 'Ice',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Ice",
    desc: "Holder's Ice-type attacks have 1.2x power. Judgment is Ice type.",
  },
  "Icium Z": {
    name: "Icium Z",
    onPlate: 'Ice',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Ice",
    forcedForme: "Arceus-Ice",
    desc: "If holder has an Ice move, this item allows it to use an Ice Z-Move.",
  },
  "Icy Rock": {
    name: "Icy Rock",
    fling: 40,
    desc: "Holder's use of Hail lasts 8 turns instead of 5.",
  },
  "Incinium Z": {
    name: "Incinium Z",
    onTakeItem: false,
    zMove: "Malicious Moonsault",
    zMoveFrom: "Darkest Lariat",
    zMoveUser: ["Incineroar"],
    desc: "If holder is an Incineroar with Darkest Lariat, it can use Malicious Moonsault.",
  },
  "Insect Plate": {
    name: "Insect Plate",
    onPlate: 'Bug',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Bug",
    desc: "Holder's Bug-type attacks have 1.2x power. Judgment is Bug type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Bug")
        return 1.2;
      return 1;
    }
  },
  "Iron Ball": {
    name: "Iron Ball",
    fling: 130,
    desc: "Holder is grounded, Speed halved. If Flying type, takes neutral Ground damage.",
    // TODO: modify matchup
  },
  "Iron Plate": {
    name: "Iron Plate",
    onPlate: 'Steel',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Steel",
    desc: "Holder's Steel-type attacks have 1.2x power. Judgment is Steel type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Steel")
        return 1.2;
      return 1;
    }
  },
  "Jaboca Berry": {
    name: "Jaboca Berry",
    desc: "If holder is hit by a physical move, attacker loses 1/8 of its max HP. Single use.",
  },
  "Kasib Berry": {
    name: "Kasib Berry",
    desc: "Halves damage taken from a supereffective Ghost-type attack. Single use.",
  },
  "Kebia Berry": {
    name: "Kebia Berry",
    desc: "Halves damage taken from a supereffective Poison-type attack. Single use.",
  },
  "Kee Berry": {
    name: "Kee Berry",
    desc: "Raises holder's Defense by 1 stage after it is hit by a physical attack. Single use.",
  },
  "Kelpsy Berry": {
    name: "Kelpsy Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Kangaskhanite": {
    name: "Kangaskhanite",
    megaStone: "Kangaskhan-Mega",
    megaEvolves: "Kangaskhan",
    desc: "If holder is a Kangaskhan, this item allows it to Mega Evolve in battle.",
  },
  "King's Rock": {
    name: "King's Rock",
    fling: 30,
    onModifyMovePriority: -1,
    desc: "Holder's attacks without a chance to flinch gain a 10% chance to flinch.",
  },
  "Lagging Tail": {
    name: "Lagging Tail",
    fling: 10,
    desc: "Holder moves last in its priority bracket.",
  },
  "Lansat Berry": {
    name: "Lansat Berry",
    desc: "Holder gains the Focus Energy effect when at 1/4 max HP or less. Single use.",
  },
  "Latiasite": {
    name: "Latiasite",
    megaStone: "Latias-Mega",
    megaEvolves: "Latias",
    desc: "If holder is a Latias, this item allows it to Mega Evolve in battle.",
  },
  "Latiosite": {
    name: "Latiosite",
    megaStone: "Latios-Mega",
    megaEvolves: "Latios",
    desc: "If holder is a Latios, this item allows it to Mega Evolve in battle.",
  },
  "Lax Incense": {
    name: "Lax Incense",
    fling: 10,
    desc: "The accuracy of attacks against the holder is 0.9x.",
  },
  "Leftovers": {
    name: "Leftovers",
    fling: 10,
    desc: "At the end of every turn, holder restores 1/16 of its max HP.",
  },
  "Leppa Berry": {
    name: "Leppa Berry",
    desc: "Restores 10 PP to the first of the holder's moves to reach 0 PP. Single use.",
  },
  "Level Ball": {
    name: "Level Ball",
    desc: "A Poke Ball for catching Pokemon that are a lower level than your own.",
  },
  "Liechi Berry": {
    name: "Liechi Berry",
    desc: "Raises holder's Attack by 1 stage when at 1/4 max HP or less. Single use.",
  },
  "Life Orb": {
    name: "Life Orb",
    fling: 30,
    desc: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
    modifyAttack : function(attacker, move, defender) {
      return 1.3;
    }
  },
  "Light Ball": {
    name: "Light Ball",
    fling: 30,
    desc: "If holder is a Pikachu, its Attack and Sp. Atk are doubled.",
    modifyAttack : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.pikachu.num)
        return 2;
      return 1;
    }
  },
  "Light Clay": {
    name: "Light Clay",
    fling: 30,
    desc: "Holder's use of Aurora Veil, Light Screen, or Reflect lasts 8 turns instead of 5.",
  },
  "Lopunnite": {
    name: "Lopunnite",
    megaStone: "Lopunny-Mega",
    megaEvolves: "Lopunny",
    desc: "If holder is a Lopunny, this item allows it to Mega Evolve in battle.",
  },
  "Love Ball": {
    name: "Love Ball",
    desc: "Poke Ball for catching Pokemon that are the opposite gender of your Pokemon.",
  },
  "Lucarionite": {
    name: "Lucarionite",
    megaStone: "Lucario-Mega",
    megaEvolves: "Lucario",
    desc: "If holder is a Lucario, this item allows it to Mega Evolve in battle.",
  },
  "Lucky Punch": {
    name: "Lucky Punch",
    fling: 40,
    desc: "If holder is a Chansey, its critical hit ratio is raised by 2 stages.",
  },
  "Lum Berry": {
    name: "Lum Berry",
    desc: "Holder cures itself if it is confused or has a major status condition. Single use.",
  },
  "Luminous Moss": {
    name: "Luminous Moss",
    fling: 30,
    desc: "Raises holder's Sp. Def by 1 stage if hit by a Water-type attack. Single use.",
  },
  "Lure Ball": {
    name: "Lure Ball",
    desc: "A Poke Ball for catching Pokemon hooked by a Rod when fishing.",
  },
  "Lustrous Orb": {
    name: "Lustrous Orb",
    fling: 60,
    onBasePowerPriority: 6,
    desc: "If holder is a Palkia, its Water- and Dragon-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.palkia.num && (move.type === "Water" || move.type === "Dragon"))
        return 1.2;
      return 1;
    }
  },
  "Luxury Ball": {
    name: "Luxury Ball",
    desc: "A comfortable Poke Ball that makes a caught wild Pokemon quickly grow friendly.",
  },
  "Macho Brace": {
    name: "Macho Brace",
    ignoreKlutz: true,
    fling: 60,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Magnet": {
    name: "Magnet",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Electric-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Electric")
        return 1.2;
      return 1;
    }
  },
  "Mago Berry": {
    name: "Mago Berry",
    desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
  },
  "Magost Berry": {
    name: "Magost Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Mail": {
    name: "Mail",
    desc: "Cannot be given to or taken from a Pokemon, except by Covet/Knock Off/Thief.",
  },
  "Manectite": {
    name: "Manectite",
    megaStone: "Manectric-Mega",
    megaEvolves: "Manectric",
    desc: "If holder is a Manectric, this item allows it to Mega Evolve in battle.",
  },
  "Maranga Berry": {
    name: "Maranga Berry",
    desc: "Raises holder's Sp. Def by 1 stage after it is hit by a special attack. Single use.",
  },
  "Marshadium Z": {
    name: "Marshadium Z",
    onTakeItem: false,
    zMove: "Soul-Stealing 7-Star Strike",
    zMoveFrom: "Spectral Thief",
    zMoveUser: ["Marshadow"],
    desc: "If holder is Marshadow with Spectral Thief, it can use Soul-Stealing 7-Star Strike.",
  },
  "Master Ball": {
    name: "Master Ball",
    desc: "The best Ball with the ultimate performance. It will catch any wild Pokemon.",
  },
  "Mawilite": {
    name: "Mawilite",
    megaStone: "Mawile-Mega",
    megaEvolves: "Mawile",
    desc: "If holder is a Mawile, this item allows it to Mega Evolve in battle.",
  },
  "Meadow Plate": {
    name: "Meadow Plate",
    onPlate: 'Grass',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Grass",
    desc: "Holder's Grass-type attacks have 1.2x power. Judgment is Grass type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Grass")
        return 1.2;
      return 1;
    }
  },
  "Medichamite": {
    name: "Medichamite",
    megaStone: "Medicham-Mega",
    megaEvolves: "Medicham",
    desc: "If holder is a Medicham, this item allows it to Mega Evolve in battle.",
  },
  "Mental Herb": {
    name: "Mental Herb",
    fling: 10,
    desc: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment. Single use.",
  },
  "Metagrossite": {
    name: "Metagrossite",
    megaStone: "Metagross-Mega",
    megaEvolves: "Metagross",
    desc: "If holder is a Metagross, this item allows it to Mega Evolve in battle.",
  },
  "Metal Coat": {
    name: "Metal Coat",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Steel-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Steel")
        return 1.2;
      return 1;
    }
  },
  "Metal Powder": {
    name: "Metal Powder",
    fling: 10,
    onModifyDefPriority: 2,
    desc: "If holder is a Ditto that hasn't Transformed, its Defense is doubled.",
  },
  "Metronome": {
    name: "Metronome",
    fling: 30,
    desc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
    // TODO:?
  },
  "Mewnium Z": {
    name: "Mewnium Z",
    onTakeItem: false,
    zMove: "Genesis Supernova",
    zMoveFrom: "Psychic",
    zMoveUser: ["Mew"],
    desc: "If holder is a Mew with Psychic, it can use Genesis Supernova.",
  },
  "Mewtwonite X": {
    name: "Mewtwonite X",
    megaStone: "Mewtwo-Mega-X",
    megaEvolves: "Mewtwo",
    desc: "If holder is a Mewtwo, this item allows it to Mega Evolve in battle.",
  },
  "Mewtwonite Y": {
    name: "Mewtwonite Y",
    megaStone: "Mewtwo-Mega-Y",
    megaEvolves: "Mewtwo",
    desc: "If holder is a Mewtwo, this item allows it to Mega Evolve in battle.",
  },
  "Micle Berry": {
    name: "Micle Berry",
    desc: "Holder's next move has 1.2x accuracy when at 1/4 max HP or less. Single use.",
  },
  "Mind Plate": {
    name: "Mind Plate",
    onPlate: 'Psychic',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Psychic",
    desc: "Holder's Psychic-type attacks have 1.2x power. Judgment is Psychic type.",
  },
  "Miracle Seed": {
    name: "Miracle Seed",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Grass-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Grass")
        return 1.2;
      return 1;
    }
  },
  "Misty Seed": {
    name: "Misty Seed",
    fling: 10,
    desc: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use.",
  },
  "Moon Ball": {
    name: "Moon Ball",
    desc: "A Poke Ball for catching Pokemon that evolve using the Moon Stone.",
  },
  "Muscle Band": {
    name: "Muscle Band",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's physical attacks have 1.1x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.category)
        return 1.1;
      return 1;
    }
  },
  "Mystic Water": {
    name: "Mystic Water",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Water-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Water")
        return 1.2;
      return 1;
    }
  },
  "Nanab Berry": {
    name: "Nanab Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Nest Ball": {
    name: "Nest Ball",
    desc: "A Poke Ball that works especially well on weaker Pokemon in the wild.",
  },
  "Net Ball": {
    name: "Net Ball",
    desc: "A Poke Ball that works especially well on Water- and Bug-type Pokemon.",
  },
  "Never-Melt Ice": {
    name: "Never-Melt Ice",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Ice-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Ice")
        return 1.2;
      return 1;
    }
  },
  "Nomel Berry": {
    name: "Nomel Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Normal Gem": {
    name: "Normal Gem",
    isGem: true,
    desc: "Holder's first successful Normal-type attack will have 1.3x power. Single use.",
  },
  "Normalium Z": {
    name: "Normalium Z",
    onTakeItem: false,
    zMove: true,
    zMoveType: "Normal",
    desc: "If holder has a Normal move, this item allows it to use a Normal Z-Move.",
  },
  "Occa Berry": {
    name: "Occa Berry",
    desc: "Halves damage taken from a supereffective Fire-type attack. Single use.",
  },
  "Odd Incense": {
    name: "Odd Incense",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Psychic-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Psychic")
        return 1.2;
      return 1;
    }
  },
  "Old Amber": {
    name: "Old Amber",
    fling: 100,
    desc: "Can be revived into Aerodactyl.",
  },
  "Oran Berry": {
    name: "Oran Berry",
    desc: "Restores 10 HP when at 1/2 max HP or less. Single use.",
  },
  "Pamtre Berry": {
    name: "Pamtre Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Park Ball": {
    name: "Park Ball",
    desc: "A special Poke Ball for the Pal Park.",
  },
  "Passho Berry": {
    name: "Passho Berry",
    desc: "Halves damage taken from a supereffective Water-type attack. Single use.",
  },
  "Payapa Berry": {
    name: "Payapa Berry",
    desc: "Halves damage taken from a supereffective Psychic-type attack. Single use.",
  },
  "Pecha Berry": {
    name: "Pecha Berry",
    desc: "Holder is cured if it is poisoned. Single use.",
  },
  "Persim Berry": {
    name: "Persim Berry",
    desc: "Holder is cured if it is confused. Single use.",
  },
  "Petaya Berry": {
    name: "Petaya Berry",
    desc: "Raises holder's Sp. Atk by 1 stage when at 1/4 max HP or less. Single use.",
  },
  "Pikanium Z": {
    name: "Pikanium Z",
    onTakeItem: false,
    zMove: "Catastropika",
    zMoveFrom: "Volt Tackle",
    zMoveUser: ["Pikachu"],
    desc: "If holder is a Pikachu with Volt Tackle, it can use Catastropika.",
  },
  "Pikashunium Z": {
    name: "Pikashunium Z",
    onTakeItem: false,
    zMove: "10,000,000 Volt Thunderbolt",
    zMoveFrom: "Thunderbolt",
    zMoveUser: ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola"],
    desc: "If holder is cap Pikachu with Thunderbolt, it can use 10,000,000 Volt Thunderbolt.",
  },
  "Pinap Berry": {
    name: "Pinap Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Pinsirite": {
    name: "Pinsirite",
    megaStone: "Pinsir-Mega",
    megaEvolves: "Pinsir",
    desc: "If holder is a Pinsir, this item allows it to Mega Evolve in battle.",
  },
  "Pixie Plate": {
    name: "Pixie Plate",
    onPlate: 'Fairy',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Fairy",
    desc: "Holder's Fairy-type attacks have 1.2x power. Judgment is Fairy type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Fairy")
        return 1.2;
      return 1;
    }
  },
  "Plume Fossil": {
    name: "Plume Fossil",
    fling: 100,
    desc: "Can be revived into Archen.",
  },
  "Poison Barb": {
    name: "Poison Barb",
    fling: 70,
    onBasePowerPriority: 6,
    desc: "Holder's Poison-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Poison")
        return 1.2;
      return 1;
    }
  },
  "Poison Gem": {
    name: "Poison Gem",
    isGem: true,
    desc: "Holder's first successful Poison-type attack will have 1.3x power. Single use.",
  },
  "Poison Memory": {
    name: "Poison Memory",
    onMemory: 'Poison',
    forcedForme: "Silvally-Poison",
    desc: "Holder's Multi-Attack is Poison type.",
  },
  "Poisonium Z": {
    name: "Poisonium Z",
    onPlate: 'Poison',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Poison",
    forcedForme: "Arceus-Poison",
    desc: "If holder has a Poison move, this item allows it to use a Poison Z-Move.",
  },
  "Poke Ball": {
    name: "Poke Ball",
    desc: "A device for catching wild Pokemon. It is designed as a capsule system.",
  },
  "Pomeg Berry": {
    name: "Pomeg Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Power Anklet": {
    name: "Power Anklet",
    ignoreKlutz: true,
    fling: 70,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Power Band": {
    name: "Power Band",
    ignoreKlutz: true,
    fling: 70,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Power Belt": {
    name: "Power Belt",
    ignoreKlutz: true,
    fling: 70,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Power Bracer": {
    name: "Power Bracer",
    ignoreKlutz: true,
    fling: 70,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Power Herb": {
    name: "Power Herb",
    fling: 10,
    desc: "Holder's two-turn moves complete in one turn (except Sky Drop). Single use.",
  },
  "Power Lens": {
    name: "Power Lens",
    ignoreKlutz: true,
    fling: 70,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Power Weight": {
    name: "Power Weight",
    ignoreKlutz: true,
    fling: 70,
    desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect.",
  },
  "Premier Ball": {
    name: "Premier Ball",
    desc: "A rare Poke Ball that has been crafted to commemorate an event.",
  },
  "Primarium Z": {
    name: "Primarium Z",
    onTakeItem: false,
    zMove: "Oceanic Operetta",
    zMoveFrom: "Sparkling Aria",
    zMoveUser: ["Primarina"],
    desc: "If holder is a Primarina with Sparkling Aria, it can use Oceanic Operetta.",
  },
  "Protective Pads": {
    name: "Protective Pads",
    fling: 30,
    desc: "Holder's attacks do not make contact with the target.",
    // TODO: meep meep
  },
  "Psychic Gem": {
    name: "Psychic Gem",
    isGem: true,
    desc: "Holder's first successful Psychic-type attack will have 1.3x power. Single use.",
  },
  "Psychic Memory": {
    name: "Psychic Memory",
    onMemory: 'Psychic',
    forcedForme: "Silvally-Psychic",
    desc: "Holder's Multi-Attack is Psychic type.",
  },
  "Psychic Seed": {
    name: "Psychic Seed",
    fling: 10,
    desc: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
  },
  "Psychium Z": {
    name: "Psychium Z",
    onPlate: 'Psychic',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Psychic",
    forcedForme: "Arceus-Psychic",
    desc: "If holder has a Psychic move, this item allows it to use a Psychic Z-Move.",
  },
  "Qualot Berry": {
    name: "Qualot Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Quick Ball": {
    name: "Quick Ball",
  },
  "Quick Claw": {
    onModifyPriorityPriority: -1,
    name: "Quick Claw",
    fling: 80,
    desc: "Each turn, holder has a 20% chance to move first in its priority bracket.",
  },
  "Quick Powder": {
    name: "Quick Powder",
    fling: 10,
    desc: "If holder is a Ditto that hasn't Transformed, its Speed is doubled.",
  },
  "Rabuta Berry": {
    name: "Rabuta Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Rare Bone": {
    name: "Rare Bone",
    fling: 100,
    desc: "No competitive use other than when used with Fling.",
  },
  "Rawst Berry": {
    name: "Rawst Berry",
    desc: "Holder is cured if it is burned. Single use.",
  },
  "Razor Claw": {
    name: "Razor Claw",
    fling: 80,
    desc: "Holder's critical hit ratio is raised by 1 stage.",
  },
  "Razor Fang": {
    name: "Razor Fang",
    fling: 30,
    onModifyMovePriority: -1,
    desc: "Holder's attacks without a chance to flinch gain a 10% chance to flinch.",
  },
  "Razz Berry": {
    name: "Razz Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Red Card": {
    name: "Red Card",
    fling: 10,
    desc: "If holder survives a hit, attacker is forced to switch to a random ally. Single use.",
  },
  "Red Orb": {
    name: "Red Orb",
    desc: "If holder is a Groudon, this item triggers its Primal Reversion in battle.",
  },
  "Repeat Ball": {
    name: "Repeat Ball",
    desc: "A Poke Ball that works well on Pokemon species that were previously caught.",
  },
  "Rindo Berry": {
    name: "Rindo Berry",
    desc: "Halves damage taken from a supereffective Grass-type attack. Single use.",
  },
  "Ring Target": {
    name: "Ring Target",
    fling: 10,
    onNegateImmunity: false,
    desc: "The holder's type immunities granted solely by its typing are negated.",
    // TODO: modify matchup
  },
  "Rock Gem": {
    name: "Rock Gem",
    isGem: true,
    desc: "Holder's first successful Rock-type attack will have 1.3x power. Single use.",
  },
  "Rock Incense": {
    name: "Rock Incense",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Rock-type attacks have 1.2x power.",
  },
  "Rock Memory": {
    name: "Rock Memory",
    onMemory: 'Rock',
    forcedForme: "Silvally-Rock",
    desc: "Holder's Multi-Attack is Rock type.",
  },
  "Rockium Z": {
    name: "Rockium Z",
    onPlate: 'Rock',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Rock",
    forcedForme: "Arceus-Rock",
    desc: "If holder has a Rock move, this item allows it to use a Rock Z-Move.",
  },
  "Rocky Helmet": {
    name: "Rocky Helmet",
    fling: 60,
    onAfterDamageOrder: 2,
    desc: "If holder is hit by a contact move, the attacker loses 1/6 of its max HP.",
  },
  "Root Fossil": {
    name: "Root Fossil",
    fling: 100,
    desc: "Can be revived into Lileep.",
  },
  "Rose Incense": {
    name: "Rose Incense",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Grass-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Grass")
        return 1.2;
      return 1;
    }
  },
  "Roseli Berry": {
    name: "Roseli Berry",
    desc: "Halves damage taken from a supereffective Fairy-type attack. Single use.",
  },
  "Rowap Berry": {
    name: "Rowap Berry",
    desc: "If holder is hit by a special move, attacker loses 1/8 of its max HP. Single use.",
  },
  "Sablenite": {
    name: "Sablenite",
    megaStone: "Sableye-Mega",
    megaEvolves: "Sableye",
    desc: "If holder is a Sableye, this item allows it to Mega Evolve in battle.",
  },
  "Safari Ball": {
    name: "Safari Ball",
    desc: "A special Poke Ball that is used only in the Safari Zone and Great Marsh.",
  },
  "Safety Goggles": {
    name: "Safety Goggles",
    fling: 80,
    desc: "Holder is immune to powder moves and damage from Sandstorm or Hail.",
  },
  "Salac Berry": {
    name: "Salac Berry",
    desc: "Raises holder's Speed by 1 stage when at 1/4 max HP or less. Single use.",
  },
  "Salamencite": {
    name: "Salamencite",
    megaStone: "Salamence-Mega",
    megaEvolves: "Salamence",
    desc: "If holder is a Salamence, this item allows it to Mega Evolve in battle.",
  },
  "Sceptilite": {
    name: "Sceptilite",
    megaStone: "Sceptile-Mega",
    megaEvolves: "Sceptile",
    desc: "If holder is a Sceptile, this item allows it to Mega Evolve in battle.",
  },
  "Scizorite": {
    name: "Scizorite",
    megaStone: "Scizor-Mega",
    megaEvolves: "Scizor",
    desc: "If holder is a Scizor, this item allows it to Mega Evolve in battle.",
  },
  "Scope Lens": {
    name: "Scope Lens",
    fling: 30,
    desc: "Holder's critical hit ratio is raised by 1 stage.",
  },
  "Sea Incense": {
    name: "Sea Incense",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Water-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Water")
        return 1.2;
      return 1;
    }
  },
  "Sharp Beak": {
    name: "Sharp Beak",
    fling: 50,
    onBasePowerPriority: 6,
    desc: "Holder's Flying-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Flying")
        return 1.2;
      return 1;
    }
  },
  "Sharpedonite": {
    name: "Sharpedonite",
    megaStone: "Sharpedo-Mega",
    megaEvolves: "Sharpedo",
    desc: "If holder is a Sharpedo, this item allows it to Mega Evolve in battle.",
  },
  "Shed Shell": {
    name: "Shed Shell",
    fling: 10,
    onTrapPokemonPriority: -10,
    desc: "Holder may switch out even when trapped by another Pokemon, or by Ingrain.",
  },
  "Shell Bell": {
    name: "Shell Bell",
    fling: 30,
    onAfterMoveSecondarySelfPriority: -1,
    desc: "After an attack, holder gains 1/8 of the damage in HP dealt to other Pokemon.",
  },
  "Shock Drive": {
    name: "Shock Drive",
    onDrive: 'Electric',
    forcedForme: "Genesect-Shock",
    desc: "Holder's Techno Blast is Electric type.",
  },
  "Shuca Berry": {
    name: "Shuca Berry",
    desc: "Halves damage taken from a supereffective Ground-type attack. Single use.",
  },
  "Silk Scarf": {
    name: "Silk Scarf",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Normal-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Normal")
        return 1.2;
      return 1;
    }
  },
  "SilverPowder": {
    name: "SilverPowder",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Bug-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Bug")
        return 1.2;
      return 1;
    }
  },
  "Sitrus Berry": {
    name: "Sitrus Berry",
    desc: "Restores 1/4 max HP when at 1/2 max HP or less. Single use.",
  },
  "Skull Fossil": {
    name: "Skull Fossil",
    fling: 100,
  },
  "Sky Plate": {
    name: "Sky Plate",
    onPlate: 'Flying',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Flying",
    desc: "Holder's Flying-type attacks have 1.2x power. Judgment is Flying type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Flying")
        return 1.2;
      return 1;
    }
  },
  "Slowbronite": {
    name: "Slowbronite",
    megaStone: "Slowbro-Mega",
    megaEvolves: "Slowbro",
    desc: "If holder is a Slowbro, this item allows it to Mega Evolve in battle.",
  },
  "Smooth Rock": {
    name: "Smooth Rock",
    fling: 10,
    desc: "Holder's use of Sandstorm lasts 8 turns instead of 5.",
  },
  "Snorlium Z": {
    name: "Snorlium Z",
    onTakeItem: false,
    zMove: "Pulverizing Pancake",
    zMoveFrom: "Giga Impact",
    zMoveUser: ["Snorlax"],
    desc: "If holder is a Snorlax with Giga Impact, it can use Pulverizing Pancake.",
  },
  "Snowball": {
    name: "Snowball",
    fling: 30,
    desc: "Raises holder's Attack by 1 if hit by an Ice-type attack. Single use.",
  },
  "Soft Sand": {
    name: "Soft Sand",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Ground-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Ground")
        return 1.2;
      return 1;
    }
  },
  "Soul Dew": {
    name: "Soul Dew",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "If holder's a Latias/Latios, its Dragon- and Psychic-type moves have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.latios.num || attacker.species.num === pokedex.latias.num)
        if (move.type === "Dragon" || move.type === "Psychic")
          return 1.2;
      return 1;
    }
  },
  "Spell Tag": {
    name: "Spell Tag",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Ghost-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Ghost")
        return 1.2;
      return 1;
    }
  },
  "Spelon Berry": {
    name: "Spelon Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Splash Plate": {
    name: "Splash Plate",
    onPlate: 'Water',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Water",
    desc: "Holder's Water-type attacks have 1.2x power. Judgment is Water type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Water")
        return 1.2;
      return 1;
    }
  },
  "Spooky Plate": {
    name: "Spooky Plate",
    onPlate: 'Ghost',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Ghost",
    desc: "Holder's Ghost-type attacks have 1.2x power. Judgment is Ghost type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Ghost")
        return 1.2;
      return 1;
    }
  },
  "Sport Ball": {
    name: "Sport Ball",
    desc: "A special Poke Ball for the Bug-Catching Contest.",
  },
  "Starf Berry": {
    name: "Starf Berry",
    desc: "Raises a random stat by 2 when at 1/4 max HP or less (not acc/eva). Single use.",
  },
  "Steelixite": {
    name: "Steelixite",
    megaStone: "Steelix-Mega",
    megaEvolves: "Steelix",
    desc: "If holder is a Steelix, this item allows it to Mega Evolve in battle.",
  },
  "Steel Gem": {
    name: "Steel Gem",
    isGem: true,
    desc: "Holder's first successful Steel-type attack will have 1.3x power. Single use.",
  },
  "Steel Memory": {
    name: "Steel Memory",
    onMemory: 'Steel',
    forcedForme: "Silvally-Steel",
    desc: "Holder's Multi-Attack is Steel type.",
  },
  "Steelium Z": {
    name: "Steelium Z",
    onPlate: 'Steel',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Steel",
    forcedForme: "Arceus-Steel",
    desc: "If holder has a Steel move, this item allows it to use a Steel Z-Move.",
  },
  "Stick": {
    name: "Stick",
    fling: 60,
    desc: "If holder is a Farfetch'd, its critical hit ratio is raised by 2 stages.",
  },
  "Sticky Barb": {
    name: "Sticky Barb",
    fling: 80,
    desc: "Each turn, holder loses 1/8 max HP. An attacker making contact can receive it.",
  },
  "Stone Plate": {
    name: "Stone Plate",
    onPlate: 'Rock',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Rock",
    desc: "Holder's Rock-type attacks have 1.2x power. Judgment is Rock type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Rock")
        return 1.2;
      return 1;
    }
  },
  "Swampertite": {
    name: "Swampertite",
    megaStone: "Swampert-Mega",
    megaEvolves: "Swampert",
    desc: "If holder is a Swampert, this item allows it to Mega Evolve in battle.",
  },
  "Tamato Berry": {
    name: "Tamato Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Tanga Berry": {
    name: "Tanga Berry",
    desc: "Halves damage taken from a supereffective Bug-type attack. Single use.",
  },
  "Tapunium Z": {
    name: "Tapunium Z",
    onTakeItem: false,
    zMove: "Guardian of Alola",
    zMoveFrom: "Nature's Madness",
    zMoveUser: ["Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini"],
    desc: "If holder is a Tapu with Nature's Madness, it can use Guardian of Alola.",
  },
  "Terrain Extender": {
    name: "Terrain Extender",
    fling: 60,
    desc: "Holder's use of Electric/Grassy/Misty/Psychic Terrain lasts 8 turns instead of 5.",
  },
  "Thick Club": {
    name: "Thick Club",
    fling: 90,
    onModifyAtkPriority: 1,
    desc: "If holder is a Cubone or a Marowak, its Attack is doubled.",
    modifyAttack : function(attacker, move, defender) {
      if (attacker.species.num === pokedex.cubone.num || attacker.species.num === pokedex.marowak.num)
        return 1.2;
      return 1;
    }
  },
  "Timer Ball": {
    name: "Timer Ball",
    desc: "A Poke Ball that becomes better the more turns there are in a battle.",
  },
  "Toxic Orb": {
    name: "Toxic Orb",
    fling: 30,
    desc: "At the end of every turn, this item attempts to badly poison the holder.",
  },
  "Toxic Plate": {
    name: "Toxic Plate",
    onPlate: 'Poison',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Poison",
    desc: "Holder's Poison-type attacks have 1.2x power. Judgment is Poison type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Poison")
        return 1.2;
      return 1;
    }
  },
  "Twisted Spoon": {
    name: "Twisted Spoon",
    fling: 30,
    onBasePowerPriority: 6,
    desc: "Holder's Psychic-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Psychic")
        return 1.2;
      return 1;
    }
  },
  "Tyranitarite": {
    name: "Tyranitarite",
    megaStone: "Tyranitar-Mega",
    megaEvolves: "Tyranitar",
    desc: "If holder is a Tyranitar, this item allows it to Mega Evolve in battle.",
  },
  "Ultra Ball": {
    name: "Ultra Ball",
  },
  "Venusaurite": {
    name: "Venusaurite",
    megaStone: "Venusaur-Mega",
    megaEvolves: "Venusaur",
    desc: "If holder is a Venusaur, this item allows it to Mega Evolve in battle.",
  },
  "Wacan Berry": {
    name: "Wacan Berry",
    desc: "Halves damage taken from a supereffective Electric-type attack. Single use.",
  },
  "Water Gem": {
    name: "Water Gem",
    isGem: true,
    desc: "Holder's first successful Water-type attack will have 1.3x power. Single use.",
  },
  "Water Memory": {
    name: "Water Memory",
    onMemory: 'Water',
    forcedForme: "Silvally-Water",
    desc: "Holder's Multi-Attack is Water type.",
  },
  "Waterium Z": {
    name: "Waterium Z",
    onPlate: 'Water',
    onTakeItem: false,
    zMove: true,
    zMoveType: "Water",
    forcedForme: "Arceus-Water",
    desc: "If holder has a Water move, this item allows it to use a Water Z-Move.",
  },
  "Watmel Berry": {
    name: "Watmel Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "Wave Incense": {
    name: "Wave Incense",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's Water-type attacks have 1.2x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Water")
        return 1.2;
      return 1;
    }
  },
  "Weakness Policy": {
    name: "Weakness Policy",
    fling: 80,
    desc: "If holder is hit super effectively, raises Attack, Sp. Atk by 2 stages. Single use.",
  },
  "Wepear Berry": {
    name: "Wepear Berry",
    desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck.",
  },
  "White Herb": {
    name: "White Herb",
    fling: 10,
    desc: "Restores all lowered stat stages to 0 when one is less than 0. Single use.",
  },
  "Wide Lens": {
    name: "Wide Lens",
    fling: 10,
    desc: "The accuracy of attacks by the holder is 1.1x.",
  },
  "Wiki Berry": {
    name: "Wiki Berry",
    desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
  },
  "Wise Glasses": {
    name: "Wise Glasses",
    fling: 10,
    onBasePowerPriority: 6,
    desc: "Holder's special attacks have 1.1x power.",
    modifyAttack : function(attacker, move, defender) {
      if (move.category === "Special")
        return 1.2;
      return 1;
    }
  },
  "Yache Berry": {
    name: "Yache Berry",
    desc: "Halves damage taken from a supereffective Ice-type attack. Single use.",
  },
  "Zap Plate": {
    name: "Zap Plate",
    onPlate: 'Electric',
    onBasePowerPriority: 6,
    forcedForme: "Arceus-Electric",
    desc: "Holder's Electric-type attacks have 1.2x power. Judgment is Electric type.",
    modifyAttack : function(attacker, move, defender) {
      if (move.type === "Electric")
        return 1.2;
      return 1;
    }
  },
  "Zoom Lens": {
    name: "Zoom Lens",
    fling: 10,
    desc: "The accuracy of attacks by the holder is 1.2x if it moves after its target.",
  },
};
var item_autocomplete = [];
for (var item in items)  {
  if (!items[item].megaStone)
    item_autocomplete.push(item);
}
item_autocomplete.sort();

function getStoneByMega(poke) {
  for (var item in items) {
    if (items[item].megaStone && items[item].megaStone === poke) {
      return item;
    }
  }
  return null;
}

export  { items, item_autocomplete, getStoneByMega };
