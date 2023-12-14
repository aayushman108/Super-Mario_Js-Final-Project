
//function to detect collision
function collisionDetection(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
}

//function to get random integer
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to get random number
function findRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}