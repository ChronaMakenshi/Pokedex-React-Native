export const typeImages = {
    bug: require('@/assets/images/icontype/bug.png'),
    dragon: require('@/assets/images/icontype/dragon.png'),
    dark: require('@/assets/images/icontype/dark.png'),
    electric: require('@/assets/images/icontype/electric.png'),
    fairy: require('@/assets/images/icontype/fairy.png'),
    fighting: require('@/assets/images/icontype/fighting.png'),
    fire: require('@/assets/images/icontype/fire.png'),
    flying: require('@/assets/images/icontype/flying.png'),
    ghost: require('@/assets/images/icontype/ghost.png'),
    ground: require('@/assets/images/icontype/ground.png'),
    ice: require('@/assets/images/icontype/ice.png'),
    grass: require('@/assets/images/icontype/grass.png'),
    poison: require('@/assets/images/icontype/poison.png'),
    normal: require('@/assets/images/icontype/normal.png'),
    psychic: require('@/assets/images/icontype/psychic.png'),
    rock: require('@/assets/images/icontype/rock.png'),
    steel: require('@/assets/images/icontype/steel.png'),
    water: require('@/assets/images/icontype/water.png'),
};

export const versionImages = {
    red: require('@/assets/images/JeuPokemon/red.png'),
    blue: require('@/assets/images/JeuPokemon/blue.png'),
    yellow: require('@/assets/images/JeuPokemon/yellow.png'),
    gold: require('@/assets/images/JeuPokemon/gold.png'),
    silver: require('@/assets/images/JeuPokemon/silver.png'),
    crystal: require('@/assets/images/JeuPokemon/crystal.png'),
    ruby: require('@/assets/images/JeuPokemon/ruby.png'),
    sapphire: require('@/assets/images/JeuPokemon/sapphire.png'),
    emerald: require('@/assets/images/JeuPokemon/emeraude.png'),
    firered: require('@/assets/images/JeuPokemon/firered.png'),
    leafgreen: require('@/assets/images/JeuPokemon/leafgreen.png'),
    diamond: require('@/assets/images/JeuPokemon/diamond.png'),
    pearl: require('@/assets/images/JeuPokemon/pearl.png'),
    platinum: require('@/assets/images/JeuPokemon/platinum.png'),
    black: require('@/assets/images/JeuPokemon/black.png'),
    white: require('@/assets/images/JeuPokemon/white.png'),
    heartgold: require('@/assets/images/JeuPokemon/heartgold.png'),
    soulsilver: require('@/assets/images/JeuPokemon/soulsilver.png'),
    "black-2": require('@/assets/images/JeuPokemon/black-2.png'),
    "white-2": require('@/assets/images/JeuPokemon/white-2.png'),
};

export const typeColors = {
    bug: 'rgba(59, 153, 80, 0.5)',       // #3B9950
    dragon: 'rgba(174, 153, 98, 0.5)',    // #AE9962
    dark: 'rgba(51, 51, 51, 0.5)',        // #333333
    electric: 'rgba(255, 238, 0, 0.5)',   // #FFEE00
    fairy: 'rgba(224, 58, 131, 0.5)',     // #E03A83
    fighting: 'rgba(240, 97, 54, 0.5)',   // #F06136
    fire: 'rgba(255, 64, 64, 0.5)',       // #FF4040
    flying: 'rgba(147, 178, 199, 0.5)',   // #93B2C7
    ghost: 'rgba(144, 103, 144, 0.5)',    // #906790
    ground: 'rgba(169, 112, 44, 0.5)',    // #A9702C
    ice: 'rgba(135, 209, 245, 0.5)',      // #87D1F5
    grass: 'rgba(51, 187, 51, 0.5)',      // #33BB33
    poison: 'rgba(155, 105, 217, 0.5)',   // #9B69D9
    normal: 'rgba(240, 240, 240, 0.5)',   // #F0F0F0
    psychic: 'rgba(164, 42, 108, 0.5)',   // #A42A6C
    rock: 'rgba(72, 24, 11, 0.5)',        // #48180B
    steel: 'rgba(192, 192, 192, 0.5)',    // #C0C0C0
    water: 'rgba(0, 170, 255, 0.5)',      // #00AAFF
};

export const statTranslations = {
    "hp": "PV",
    "attack": "Attaque",
    "defense": "Défense",
    "special-attack": "Atq. Spé.",
    "special-defense": "Déf. Spé.",
    "speed": "Vitesse"
};

export const translations = {
    held_items: {
        'master-ball': 'Master Ball',
        'ultra-ball': 'Ultra Ball',
        'pokeball': 'Poké Ball',
        // Ajoutez plus de traductions selon vos besoins
    },
    abilities: {
        'overgrow': 'Engrais',
        'blaze': 'Brasier',
        'water-absorb': 'Absorb Eau',
        // Ajoutez plus de traductions selon vos besoins
    }
};

export const maleOnly = [32, 33, 34, 106, 107, 128, 236, 237, 313, 381, 414, 475, 538, 539, 627, 628, 641, 642, 645, 859, 860, 861];
export const femaleOnly = [29, 30, 31, 113, 115, 124, 238, 241, 242, 314, 380, 413, 416, 440, 478, 488, 548, 549, 629, 630, 669, 670, 671, 758, 761, 762, 763, 856, 857, 858, 868, 869, 905, 957, 958, 959, 1017];
export const asexual = [81, 82, 100, 101, 120, 121, 132, 137, 144, 145, 146, 150, 151, 201, 233, 243, 244, 245, 249, 250, 251, 292, 337, 338, 343, 344, 374, 375, 376, 377, 378, 379, 382, 383, 384, 385, 386, 436, 437, 462, 474, 479, 480, 481, 482, 483, 484, 486, 487, 489, 490, 491, 492, 493, 494, 599, 600, 601, 615, 622, 623, 638, 639, 640, 643, 644, 646, 647, 648, 649, 703, 716, 717, 718, 719, 720, 721, 772, 773, 774, 781, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 854, 855, 870, 880, 881, 882, 883, 888, 889, 890, 893, 894, 895, 896, 897, 898, 924, 925, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1020, 1021, 1022, 1023, 1025];