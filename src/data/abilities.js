var abilities = {
  "Adaptability" : {
    desc: "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5.",
  },
  "Aftermath" : {
    desc: "If this Pokemon is KOed with a contact move, that move's user loses 1/4 its max HP.",
  },
  "Aerilate" : {
    desc: "This Pokemon's Normal-type moves become Flying type and have 1.2x power.",
  },
  "Air Lock" : {
    desc: "While this Pokemon is active, the effects of weather conditions are disabled.",
  },
  "Analytic" : {
    desc: "This Pokemon's attacks have 1.3x power if it is the last to move in a turn.",
  },
  "Anger Point" : {
    desc: "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages.",
  },
  "Anticipation" : {
    desc: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move.",
  },
  "Arena Trap" : {
    desc: "Prevents adjacent foes from choosing to switch unless they are airborne.",
  },
  "Aroma Veil" : {
    desc: "Protects user/allies from Attract, Disable, Encore, Heal Block, Taunt, and Torment.",
  },
  "Aura Break" : {
    desc: "While this Pokemon is active, the Dark Aura and Fairy Aura power modifier is 0.75x.",
  },
  "Bad Dreams" : {
    desc: "Causes sleeping adjacent foes to lose 1/8 of their max HP at the end of each turn.",
  },
  "Battery" : {
    desc: "This Pokemon's allies have the power of their special attacks multiplied by 1.3.",
  },
  "Battle Armor" : {
    desc: "This Pokemon cannot be struck by a critical hit.",
  },
  "Battle Bond" : {
    desc: "After KOing a Pokemon: becomes Ash-Greninja, Water Shuriken: 20 power, hits 3x.",
  },
  "Beast Boost" : {
    desc: "This Pokemon's highest stat is raised by 1 if it attacks and KOes another Pokemon.",
  },
  "Berserk" : {
    desc: "This Pokemon's Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
  },
  "Big Pecks" : {
    desc: "Prevents other Pokemon from lowering this Pokemon's Defense stat stage.",
  },
  "Blaze" : {
    desc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
  },
  "Bulletproof" : {
    desc: "Makes user immune to ballistic moves (Shadow Ball, Sludge Bomb, Focus Blast, etc).",
  },
  "Cheek Pouch" : {
    desc: "If this Pokemon eats a Berry, it restores 1/3 of its max HP after the Berry's effect.",
  },
  "Chlorophyll" : {
    desc: "If Sunny Day is active, this Pokemon's Speed is doubled.",
  },
  "Clear Body" : {
    desc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
  },
  "Cloud Nine" : {
    desc: "While this Pokemon is active, the effects of weather conditions are disabled.",
  },
  "Color Change" : {
    desc: "This Pokemon's type changes to the type of a move it's hit by, unless it has the type.",
  },
  "Comatose" : {
    desc: "This Pokemon cannot be statused, and is considered to be asleep.",
  },
  "Competitive" : {
    desc: "This Pokemon's Sp. Atk is raised by 2 for each of its stats that is lowered by a foe.",
  },
  "Compound Eyes" : {
    desc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
  },
  "Contrary" : {
    desc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
  },
  "Corrosion": {
    desc: "This Pokemon can poison or badly poison other Pokemon regardless of their typing.",
  },
  "Cursed Body" : {
    desc: "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled.",
  },
  "Cute Charm" : {
    desc: "30% chance of infatuating Pokemon of the opposite gender if they make contact.",
  },
  "Damp" : {
    desc: "While this Pokemon is active, Self-Destruct, Explosion, and Aftermath have no effect.",
  },
  "Dancer" : {
    desc: "After another Pokemon uses a dance move, this Pokemon uses the same move.",
  },
  "Dark Aura" : {
    desc: "While this Pokemon is active, a Dark move used by any Pokemon has 1.33x power.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Dark')
        return 1.333;
      return 1;
    },
  },
  "Dazzling" : {
    desc: "While this Pokemon is active, allies are protected from opposing priority moves.",
  },
  "Defeatist" : {
    desc: "While this Pokemon has 1/2 or less of its max HP, its Attack and Sp. Atk are halved.",
  },
  "Defiant" : {
    desc: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe.",
  },
  "Delta Stream" : {
    desc: "On switch-in, strong winds begin until this Ability is not active in battle.",
    modifyEffectiveness : function(type, myTypes) {
      if (window.getEffectiveness(type, 'flying') > 1)
        return 0.5;
      return 1
    },
  },
  "Desolate Land" : {
    desc: "On switch-in, extremely harsh sunlight begins until this Ability is not active in battle.",
  },
  "Disguise" : {
    desc: "If this Pokemon is a Mimikyu, it takes 0 damage the first time it is attacked in battle.",
  },
  "Download" : {
    desc: "On switch-in, Attack or Sp. Atk is raised 1 stage based on the foes' weaker Defense.",
  },
  "Drizzle" : {
    desc: "On switch-in, this Pokemon summons Rain Dance.",
  },
  "Drought" : {
    desc: "On switch-in, this Pokemon summons Sunny Day.",
  },
  "Dry Skin" : {
    desc: "This Pokemon is healed 1/4 by Water, 1/8 by Rain; is hurt 1.25x by Fire, 1/8 by Sun.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Fire')
        return 1.333;
      if (type === 'Water')
        return -1;
      return 1;
    },
  },
  "Early Bird" : {
    desc: "This Pokemon's sleep counter drops by 2 instead of 1.",
  },
  "Effect Spore" : {
    desc: "30% chance of poison/paralysis/sleep on others making contact with this Pokemon.",
  },
  "Electric Surge" : {
    desc: "On switch-in, this Pokemon summons Electric Terrain.",
  },
  "Emergency Exit" : {
    desc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
  },
  "Fairy Aura" : {
    desc: "While this Pokemon is active, a Fairy move used by any Pokemon has 1.33x power.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Fairy')
        return 1.333;
      return 1;
    },
  },
  "Filter" : {
    desc: "This Pokemon receives 3/4 damage from supereffective attacks.",
    modifyEffectiveness : function(type, myTypes) {
      if (window.getEffectiveness(type, myTypes) > 1)
        return 0.75
      return 1;
    },
  },
  "Flame Body" : {
    desc: "30% chance a Pokemon making contact with this Pokemon will be burned.",
  },
  "Flare Boost" : {
    desc: "While this Pokemon is burned, its special attacks have 1.5x power.",
  },
  "Flash Fire" : {
    desc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
    modifyEffectiveness : function(type, myTypes) {
      // grants immunity to fire
      if (type === 'Fire')
        return 0;
      return 1;
    },
  },
  "Flower Gift" : {
    desc: "If user is Cherrim and Sunny Day is active, it and allies' Attack and Sp. Def are 1.5x.",
  },
  "Flower Veil" : {
    desc: "This side's Grass types can't have stats lowered or status inflicted by other Pokemon.",
  },
  "Fluffy" : {
    desc: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Fire moves.",
    modifyEffectiveness : function(type, myTypes) {
      var mult = 1;
      if (type === 'Fire')
        mult *= 2;
      // TODO: the contact move half
    }
  },
  "Forecast" : {
    desc: "Castform's type changes to the current weather condition's type, except Sandstorm.",
  },
  "Forewarn" : {
    desc: "On switch-in, this Pokemon is alerted to the foes' move with the highest power.",
  },
  "Friend Guard" : {
    desc: "This Pokemon's allies receive 3/4 damage from other Pokemon's attacks.",
  },
  "Frisk" : {
    desc: "On switch-in, this Pokemon identifies the held items of all opposing Pokemon.",
  },
  "Full Metal Body" : {
    desc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
  },
  "Fur Coat" : {
    desc: "This Pokemon's Defense is doubled.",
  },
  "Gale Wings" : {
    desc: "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 1.",
  },
  "Galvanize" : {
    desc: "This Pokemon's Normal-type moves become Electric type and have 1.2x power.",
  },
  "Gluttony" : {
    desc: "When this Pokemon has 1/2 or less of its maximum HP, it uses certain Berries early.",
  },
  "Gooey" : {
    desc: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
  },
  "Grass Pelt" : {
    desc: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5.",
  },
  "Grassy Surge" : {
    desc: "On switch-in, this Pokemon summons Grassy Terrain.",
  },
  "Guts" : {
    desc: "If this Pokemon is statused, its Attack is 1.5x; ignores burn halving physical damage.",
  },
  "Harvest" : {
    desc: "If last item used is a Berry, 50% chance to restore it each end of turn. 100% in Sun.",
  },
  "Healer" : {
    desc: "30% chance of curing an adjacent ally's status at the end of each turn.",
  },
  "Heatproof" : {
    desc: "The power of Fire-type attacks against this Pokemon is halved; burn damage halved.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Fire')
        return 0.5;
      return 1;
    },
  },
  "Heavy Metal" : {
    desc: "This Pokemon's weight is doubled.",
  },
  "Honey Gather" : {
    desc: "No competitive use.",
  },
  "Huge Power" : {
    desc: "This Pokemon's Attack is doubled.",
  },
  "Hustle" : {
    desc: "This Pokemon's Attack is 1.5x and accuracy of its physical attacks is 0.8x.",
  },
  "Hydration" : {
    desc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
  },
  "Hyper Cutter" : {
    desc: "Prevents other Pokemon from lowering this Pokemon's Attack stat stage.",
  },
  "Ice Body" : {
    desc: "If Hail is active, this Pokemon heals 1/16 of its max HP each turn; immunity to Hail.",
  },
  "Illuminate" : {
    desc: "No competitive use.",
  },
  "Illusion" : {
    desc: "This Pokemon appears as the last Pokemon in the party until it takes direct damage.",
  },
  "Immunity" : {
    desc: "This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it.",
  },
  "Imposter" : {
    desc: "On switch-in, this Pokemon Transforms into the opposing Pokemon that is facing it.",
  },
  "Infiltrator" : {
    desc: "Moves ignore substitutes and opposing Reflect, Light Screen, Safeguard, and Mist.",
  },
  "Innards Out" : {
    desc: "If this Pokemon is KOed with a move, that move's user loses an equal amount of HP.",
  },
  "Inner Focus" : {
    desc: "This Pokemon cannot be made to flinch.",
  },
  "Insomnia" : {
    desc: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it.",
  },
  "Intimidate" : {
    desc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
  },
  "Iron Barbs" : {
    desc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
  },
  "Iron Fist" : {
    desc: "This Pokemon's punch-based attacks have 1.2x power. Sucker Punch is not boosted.",
  },
  "Justified" : {
    desc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move.",
  },
  "Keen Eye" : {
    desc: "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat.",
  },
  "Klutz" : {
    desc: "This Pokemon's held item has no effect, except Macho Brace. Fling cannot be used.",
  },
  "Leaf Guard" : {
    desc: "If Sunny Day is active, this Pokemon cannot be statused and Rest will fail for it.",
  },
  "Levitate": {
    desc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
    modifyEffectiveness : function(type, myTypes) {
        if (type === 'Ground')
            return 0;
        return 1;
    },
  },
  "Light Metal": {
    desc: "This Pokemon's weight is halved.",
  },
  "Lightning Rod" : {
    desc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
    modifyEffectiveness : function(type, myTypes) {
      // grants immunity to electric
      if (type === 'Electric')
        return 0;
      return 1;
    },
  },
  "Limber" : {
    desc: "This Pokemon cannot be paralyzed. Gaining this Ability while paralyzed cures it.",
  },
  "Liquid Ooze" : {
    desc: "This Pokemon damages those draining HP from it for as much as they would heal.",
  },
  "Liquid Voice" : {
    desc: "This Pokemon's sound-based moves become Water type.",
  },
  "Long Reach" : {
    desc: "This Pokemon's attacks do not make contact with the target.",
  },
  "Magic Bounce" : {
    desc: "This Pokemon blocks certain status moves and bounces them back to the user.",
  },
  "Magic Guard" : {
    desc: "This Pokemon can only be damaged by direct attacks.",
  },
  "Magician" : {
    desc: "If this Pokemon has no item, it steals the item off a Pokemon it hits with an attack.",
  },
  "Magma Armor" : {
    desc: "This Pokemon cannot be frozen. Gaining this Ability while frozen cures it.",
  },
  "Magnet Pull" : {
    desc: "Prevents adjacent Steel-type foes from choosing to switch.",
  },
  "Marvel Scale" : {
    desc: "If this Pokemon is statused, its Defense is 1.5x.",
  },
  "Mega Launcher" : {
    desc: "This Pokemon's pulse moves have 1.5x power. Heal Pulse heals 3/4 target's max HP.",
  },
  "Merciless" : {
    desc: "This Pokemon's attacks are critical hits if the target is poisoned.",
  },
  "Minus" : {
    desc: "If an active ally has this Ability or the Ability Plus, this Pokemon's Sp. Atk is 1.5x.",
  },
  "Misty Surge" : {
    desc: "On switch-in, this Pokemon summons Misty Terrain.",
  },
  "Mold Breaker" : {
    desc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
  },
  "Moody" : {
    desc: "Raises a random stat by 2 and lowers another stat by 1 at the end of each turn.",
  },
  "Motor Drive" : {
    desc: "This Pokemon's Speed is raised 1 stage if hit by an Electric move; Electric immunity.",
    modifyEffectiveness : function(type, myTypes) {
      // grants immunity to electric attacks
      if (type === 'Electric')
        return 0;
      return 1;
    },
  },
  "Moxie" : {
    desc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
  },
  "Multiscale" : {
    desc: "If this Pokemon is at full HP, damage taken from attacks is halved.",
  },
  "Multitype" : {
    desc: "If this Pokemon is an Arceus, its type changes to match its held Plate or Z-Crystal.",
  },
  "Mummy" : {
    desc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy.",
  },
  "Natural Cure" : {
    desc: "This Pokemon has its major status condition cured when it switches out.",
  },
  "No Guard" : {
    desc: "Every move used by or against this Pokemon will always hit.",
  },
  "Normalize" : {
    desc: "This Pokemon's moves are changed to be Normal type and have 1.2x power.",
  },
  "Oblivious" : {
    desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability cures it.",
  },
  "Overcoat" : {
    desc: "This Pokemon is immune to powder moves and damage from Sandstorm or Hail.",
  },
  "Overgrow" : {
    desc: "When this Pokemon has 1/3 or less of its max HP, its Grass attacks do 1.5x damage.",
  },
  "Own Tempo" : {
    desc: "This Pokemon cannot be confused. Gaining this Ability while confused cures it.",
  },
  "Parental Bond" : {
    desc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
  },
  "Pickup" : {
    desc: "If this Pokemon has no item, it finds one used by an adjacent Pokemon this turn.",
  },
  "Pickpocket" : {
    desc: "If this Pokemon has no item, it steals the item off a Pokemon making contact with it.",
  },
  "Pixilate" : {
    desc: "This Pokemon's Normal-type moves become Fairy type and have 1.2x power.",
  },
  "Plus" : {
    desc: "If an active ally has this Ability or the Ability Minus, this Pokemon's Sp. Atk is 1.5x.",
  },
  "Poison Heal" : {
    desc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
  },
  "Poison Point" : {
    desc: "30% chance a Pokemon making contact with this Pokemon will be poisoned.",
  },
  "Poison Touch" : {
    desc: "This Pokemon's contact moves have a 30% chance of poisoning.",
  },
  "Power Construct" : {
    desc: "If Zygarde 10%/50%, changes to Complete if at 1/2 max HP or less at end of turn.",
  },
  "Power of Alchemy" : {
    desc: "This Pokemon copies the Ability of an ally that faints.",
  },
  "Prankster" : {
    desc: "This Pokemon's Status moves have priority raised by 1, but Dark types are immune.",
  },
  "Pressure" : {
    desc: "If this Pokemon is the target of a foe's move, that move loses one additional PP.",
  },
  "Primordial Sea" : {
    desc: "On switch-in, heavy rain begins until this Ability is not active in battle.",
  },
  "Prism Armor" : {
    desc: "This Pokemon receives 3/4 damage from supereffective attacks.",
    modifyEffectiveness : function(type, myTypes) {
      return abilities["Filter"].modifyEffectiveness(type, myTypes);
    },
  },
  "Protean" : {
    desc: "This Pokemon's type changes to match the type of the move it is about to use.",
  },
  "Psychic Surge" : {
    desc: "On switch-in, this Pokemon summons Psychic Terrain.",
  },
  "Pure Power" : {
    desc: "This Pokemon's Attack is doubled.",
  },
  "Queenly Majesty" : {
    desc: "While this Pokemon is active, allies are protected from opposing priority moves.",
  },
  "Quick Feet" : {
    desc: "If this Pokemon is statused, its Speed is 1.5x; ignores Speed drop from paralysis.",
  },
  "Rain Dish" : {
    desc: "If Rain Dance is active, this Pokemon heals 1/16 of its max HP each turn.",
  },
  "Rattled" : {
    desc: "This Pokemon's Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack.",
  },
  "Receiver" : {
    desc: "This Pokemon copies the Ability of an ally that faints.",
  },
  "Reckless" : {
    desc: "This Pokemon's attacks with recoil or crash damage have 1.2x power; not Struggle.",
  },
  "Refrigerate" : {
    desc: "This Pokemon's Normal-type moves become Ice type and have 1.2x power.",
  },
  "Regenerator" : {
    desc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
  },
  "Rivalry" : {
    desc: "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender.",
  },
  "RKS System" : {
    desc: "If this Pokemon is a Silvally, its type changes to match its held Memory.",
  },
  "Rock Head" : {
    desc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
  },
  "Rough Skin" : {
    desc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
  },
  "Run Away" : {
    desc: "No competitive use.",
  },
  "Sand Force" : {
    desc: "This Pokemon's Ground/Rock/Steel attacks do 1.3x in Sandstorm; immunity to it.",
  },
  "Sand Rush" : {
    desc: "If Sandstorm is active, this Pokemon's Speed is doubled; immunity to Sandstorm.",
  },
  "Sand Stream" : {
    desc: "On switch-in, this Pokemon summons Sandstorm.",
  },
  "Sand Veil" : {
    desc: "If Sandstorm is active, this Pokemon's evasiveness is 1.25x; immunity to Sandstorm.",
  },
  "Sap Sipper" : {
    desc: "This Pokemon's Attack is raised 1 stage if hit by a Grass move; Grass immunity.",
    modifyEffectiveness : function(type, myTypes) {
      // grants immunity to grass attacks
      if (type === 'Grass')
        return 0;
      return 1;
    },
  },
  "Schooling" : {
    desc: "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form.",
  },
  "Scrappy" : {
    desc: "This Pokemon can hit Ghost types with Normal- and Fighting-type moves.",
  },
  "Serene Grace" : {
    desc: "This Pokemon's moves have their secondary effect chance doubled.",
  },
  "Shadow Shield" : {
    desc: "If this Pokemon is at full HP, damage taken from attacks is halved.",
    modifyEffectiveness: function(type, myTypes) {
      // TODO: hmm, not sure about this one
      return 1;
    }
  },
  "Shadow Tag" : {
    desc: "Prevents adjacent foes from choosing to switch unless they also have this Ability.",
  },
  "Shed Skin" : {
    desc: "This Pokemon has a 33% chance to have its status cured at the end of each turn.",
  },
  "Sheer Force" : {
    desc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
  },
  "Shell Armor" : {
    desc: "This Pokemon cannot be struck by a critical hit.",
  },
  "Shield Dust" : {
    desc: "This Pokemon is not affected by the secondary effect of another Pokemon's attack.",
  },
  "Shields Down" : {
    desc: "If Minior, switch-in/end of turn it changes to Core at 1/2 max HP or less, else Meteor.",
  },
  "Simple" : {
    desc: "If this Pokemon's stat stages are raised or lowered, the effect is doubled instead.",
  },
  "Skill Link" : {
    desc: "This Pokemon's multi-hit attacks always hit the maximum number of times.",
  },
  "Slow Start" : {
    desc: "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns.",
  },
  "Slush Rush" : {
    desc: "If Hail is active, this Pokemon's Speed is doubled.",
  },
  "Sniper" : {
    desc: "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.5.",
  },
  "Snow Cloak" : {
    desc: "If Hail is active, this Pokemon's evasiveness is 1.25x; immunity to Hail.",
  },
  "Snow Warning" : {
    desc: "On switch-in, this Pokemon summons Hail.",
  },
  "Solar Power" : {
    desc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn.",
  },
  "Solid Rock" : {
    desc: "This Pokemon receives 3/4 damage from supereffective attacks.",
    modifyEffectiveness : function(type, myTypes) {
      return abilities["Filter"].modifyEffectiveness(type, myTypes);
    },
  },
  "Soul-Heart" : {
    desc: "This Pokemon's Sp. Atk is raised by 1 stage when another Pokemon faints.",
  },
  "Soundproof" : {
    desc: "This Pokemon is immune to sound-based moves, including Heal Bell.",
  },
  "Speed Boost" : {
    desc: "This Pokemon's Speed is raised 1 stage at the end of each full turn on the field.",
  },
  "Stakeout" : {
    desc: "This Pokemon's attacks deal double damage if the target switched in this turn.",
  },
  "Stall" : {
    desc: "This Pokemon moves last among Pokemon using the same or greater priority moves.",
  },
  "Stamina" : {
    desc: "This Pokemon's Defense is raised by 1 stage after it is damaged by a move.",
  },
  "Stance Change" : {
    desc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
  },
  "Static" : {
    desc: "30% chance a Pokemon making contact with this Pokemon will be paralyzed.",
  },
  "Steadfast" : {
    desc: "If this Pokemon flinches, its Speed is raised by 1 stage.",
  },
  "Steelworker" : {
    desc: "This Pokemon's Steel-type attacks have their power multiplied by 1.5.",
  },
  "Stench" : {
    desc: "This Pokemon's attacks without a chance to flinch have a 10% chance to flinch.",
  },
  "Sticky Hold" : {
    desc: "This Pokemon cannot lose its held item due to another Pokemon's attack.",
  },
  "Storm Drain" : {
    desc: "This Pokemon draws Water moves to itself to raise Sp. Atk by 1; Water immunity.",
    modifyEffectiveness : function(type, myTypes) {
      // grants immunity to water attacks
      if (type === 'Water')
        return 0;
      return 1;
    },
  },
  "Strong Jaw" : {
    desc: "This Pokemon's bite-based attacks have 1.5x power. Bug Bite is not boosted.",
  },
  "Sturdy" : {
    desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
  },
  "Suction Cups" : {
    desc: "This Pokemon cannot be forced to switch out by another Pokemon's attack or item.",
  },
  "Super Luck" : {
    desc: "This Pokemon's critical hit ratio is raised by 1 stage.",
  },
  "Surge Surfer" : {
    desc: "If Electric Terrain is active, this Pokemon's Speed is doubled.",
  },
  "Swarm" : {
    desc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
  },
  "Sweet Veil" : {
    desc: "This Pokemon and its allies cannot fall asleep.",
  },
  "Swift Swim" : {
    desc: "If Rain Dance is active, this Pokemon's Speed is doubled.",
  },
  "Symbiosis" : {
    desc: "If an ally uses its item, this Pokemon gives its item to that ally immediately.",
  },
  "Synchronize" : {
    desc: "If another Pokemon burns/poisons/paralyzes this Pokemon, it also gets that status.",
  },
  "Tangled Feet" : {
    desc: "This Pokemon's evasiveness is doubled as long as it is confused.",
  },
  "Tangling Hair" : {
    desc: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
  },
  "Technician" : {
    desc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
  },
  "Telepathy" : {
    desc: "This Pokemon does not take damage from attacks made by its allies.",
  },
  "Teravolt" : {
    desc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
  },
  "Thick Fat" : {
    desc: "Fire/Ice-type moves against this Pokemon deal damage with a halved attacking stat.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Fire' || type === 'Ice')
        return 0.5;
      return 1;
    },
  },
  "Tinted Lens" : {
    desc: "This Pokemon's attacks that are not very effective on a target deal double damage.",
  },
  "Torrent" : {
    desc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage.",
  },
  "Toxic Boost" : {
    desc: "While this Pokemon is poisoned, its physical attacks have 1.5x power.",
  },

  "Tough Claws" : {
    desc: "This Pokemon's contact moves have their power multiplied by 1.3.",
  },
  "Trace" : {
    desc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
  },
  "Triage" : {
    desc: "This Pokemon's healing moves have their priority increased by 3.",
  },
  "Truant" : {
    desc: "This Pokemon skips every other turn instead of using a move.",
  },
  "Turboblaze" : {
    desc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
  },
  "Unaware" : {
    desc: "This Pokemon ignores other Pokemon's stat stages when taking or doing damage.",
  },
  "Unburden" : {
    desc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
  },
  "Unnerve" : {
    desc: "While this Pokemon is active, it prevents opposing Pokemon from using their Berries.",
  },
  "Victory Star" : {
    desc: "This Pokemon and its allies' moves have their accuracy multiplied by 1.1.",
  },
  "Vital Spirit" : {
    desc: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it.",
  },
  "Volt Absorb" : {
    desc: "This Pokemon heals 1/4 of its max HP when hit by Electric moves; Electric immunity.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Water')
        return -1;
      return 1;
    },
  },
  "Water Absorb" : {
    desc: "This Pokemon heals 1/4 of its max HP when hit by Water moves; Water immunity.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Electric')
        return -1;
      return 1;
    },
  },
  "Water Bubble" : {
    desc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
    modifyEffectiveness : function(type, myTypes) {
      if (type === 'Fire')
        return 0.5;
      return 1;
    },
  },
  "Water Compaction" : {
    desc: "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move.",
  },
  "Water Veil" : {
    desc: "This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
  },
  "Weak Armor" : {
    desc: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 2.",
  },
  "White Smoke" : {
    desc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
  },
  "Wimp Out" : {
    desc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
  },
  "Wonder Guard" : {
    desc: "This Pokemon can only be damaged by supereffective moves and indirect damage.",
    modifyEffectiveness : function(type, myTypes) {
      for (var myType in myTypes) {
        if (window.getEffectiveness(type, myType) <= 1)
          return 0;
      }
      return 1;
    }
  },
  "Wonder Skin" : {
    desc: "Status moves with accuracy checks are 50% accurate when used on this Pokemon.",
  },
  "Zen Mode" : {
    desc: "If Darmanitan, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
  },
  "Rebound" : {
    desc: "On switch-in, blocks certain status moves and bounces them back to the user.",
  },
  "Persistent" : {
    desc: "The duration of certain field effects is increased by 2 turns if used by this Pokemon.",
  }
}

export { abilities };
