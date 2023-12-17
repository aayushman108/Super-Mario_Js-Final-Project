
// let brickArray = [];
// let groundArray = [];
// let stairArray = [];
// let coinArray = [];
// let mysteryArray = [];
// let milesArray = [];
// let bridgeArray = [];

// const savedDataString = localStorage.getItem('mapData');
// if (savedDataString) {
//   const savedData = JSON.parse(savedDataString);

//   brickArray = savedData.brick || [];
//   groundArray = savedData.ground || [];
//   stairArray = savedData.stair || [];
//   coinArray = savedData.coin || [];
//   mysteryArray = savedData.mystery || [];
//   milesArray = savedData.miles || [];
//   bridgeArray = savedData.bridge || [];
// }

const levelOne = {
  flag: [],
  flagpole: [],
  castle: [],

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

  goombas: [
    // [672, 176, 16, 16],
    // [832, 176, 16, 16],
    // [560, 176, 16, 16],
    // [1920, 176, 16, 16],
  ],

  koopas: [
    // [400, 176, 16, 24],
    // [832, 176, 16, 24],
    // [2150, 176, 16, 24],
    // [2768, 176, 16, 24],
  ],

  grasses: [
    // [183, 176, 54, 16],
    // [375, 176, 32, 16],
    // [663, 176, 32, 16],
    // [951, 176, 32, 16],
    // [1143, 176, 32, 16],
    // [1447, 176, 32, 16],
    // [1735, 176, 32, 16],
    // [1927, 176, 32, 16],
    // [2224, 176, 32, 16],
    // [2695, 176, 32, 16],
  ],
};



