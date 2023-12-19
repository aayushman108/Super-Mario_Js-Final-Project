

const levelTwo = {
  flag: [],
  flagpole: [],
  castle: [[4064, 82, 100, 110], [0, 102, 90, 90]],

  smallClouds: [
    [311, 16, 32, 24],
    [903, 32, 32, 24],
    [1080, 16, 32, 24],
    [1368, 16, 48, 24],
    [1687, 32, 32, 24],
    [1863, 16, 32, 24],
    [2455, 32, 32, 24],
    [2631, 16, 32, 24],
    [3223, 32, 32, 24],
  ],

  largeClouds: [
    [440, 32, 64, 24],
    [584, 16, 48, 24],
    [1224, 32, 64, 24],
    [1992, 32, 64, 24],
    [2759, 32, 64, 24],
    [2135, 16, 48, 24],
    [2904, 16, 48, 24],
  ],
  
  bricks: [...savedData.brick],
  ground: [...savedData.ground],

  stairs: [...savedData.stair],

  pipes: [
    [1296, 160, 32, 64], [1664, 144, 32, 48], [1856, 144, 32, 48],
    [1952, 192, 32, 48], [1984, 192, 32, 48], [2816, 144, 32, 48],
    [2784, 160, 32, 32], [3424, 192, 32, 48], [3568, 144, 32, 48],
    [3536, 160, 32, 32]
  ],
 
  mysteryBoxes: [...savedData.mystery],

  coins: [...savedData.coin],

  bridges: [...savedData.bridge],

  miles: [...savedData.miles],

  snails: [
          [3200, 176, 18,16], 
          [3328, 176, 18, 16],
          [706, 146, 18, 16],
          [756, 130, 18, 16]
        ],

  ducks: [
    [400, 176, 17, 24],
    [1550, 176, 17, 24],
    [1465, 102, 17, 24],
    [1445, 40, 17, 24],
    [2100, 176, 17, 24],
    [2240, 88, 17, 24],
    [2736, 176, 17, 24],
    [3104, 176, 17, 24],
    [3792, 64, 17, 24]
  ],
  goombas: [
    [1840, 176, 16, 16],
  ],

  koopas: [
    [1072, 112, 16, 24],
    [1165, 64, 16, 24]
  ],

  grasses: [
  ],
};


const buildLevel = {
  flag: [],
  flagpole: [...savedData2.flagpole],
  castle: [...savedData2.castle],

  smallClouds: [],

  largeClouds: [],
  
  bricks: [...savedData2.brick],

  ground: [...savedData2.ground],

  stairs: [...savedData2.stair],

  pipes: [...savedData2.pipe],
 
  mysteryBoxes: [...savedData2.mystery],

  coins: [...savedData2.coin],

  bridges: [...savedData2.bridge],

  miles: [...savedData2.miles],

  snails: [...savedData2.snail],

  ducks: [...savedData2.duck],

  goombas: [...savedData2.goomba],

  koopas: [...savedData2.koopa],

  grasses: [],
}