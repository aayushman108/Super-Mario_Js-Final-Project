class MapMaker{
  constructor(canvasId, compartmentSize) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.compartmentSize = compartmentSize;
      this.imagePalette = document.getElementById('imagePalette');
      this.paletteImages = [...document.getElementsByClassName('image')];
      this.currentImage = null;
      this.image = new Image();

      //entity array
      this.brickArray = [];
      this.groundArray = [];
      this.stairArray = [];
      this.coinArray = [];
      this.mysteryArray = [];
      this.milesArray = [];
      this.bridgeArray = [];
      this.snailArray = [];
      this.duckArray = [];
      this.goombaArray = [];
      this.koopaArray = [];
      this.pipeArray = [];

      //Eventlisteners........
      //handle click on the canvas
      this.canvas.addEventListener('click', (e) => this.clickHandler(e));
      //handle click on image palette to select image
      this.imagePalette.addEventListener('click', (e) => {
        if (e.target.classList.contains('image')) {
          const image = e.target.style.backgroundImage;
          this.currentImage = image.slice(5, -2);
          this.image.src = this.currentImage;
        }
      });
      //handle click on image palette to show the active palette
      this.paletteImages.forEach(item => {
        item.addEventListener('click', (e) => {
          this.paletteImages.forEach(unit =>{
            unit.classList.remove("active");
          })

          e.target.classList.add("active");
        })
      })
  }

  getAllEntities() {
    return [
      ...this.brickArray,
      ...this.groundArray,
      ...this.stairArray,
      ...this.coinArray,
      ...this.mysteryArray,
      ...this.milesArray, 
      ...this.bridgeArray,
      ...this.snailArray,
      ...this.duckArray,
      ...this.goombaArray,
      ...this.koopaArray,
      ...this.pipeArray,
    ];
  }
  
  draw(x,y){
    this.ctx.drawImage(this.image, x, y, this.compartmentSize, this.compartmentSize);
  }

  clear(x,y){
    this.ctx.clearRect(x, y, this.compartmentSize, this.compartmentSize);
  }

  drawMap() {
    const rows = this.canvas.height / this.compartmentSize;
    const columns = this.canvas.width / this.compartmentSize;

    // Draw grid lines
    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 1;

    for (let i = 1; i < rows; i++) {
      const y = i * this.compartmentSize;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    for (let j = 1; j < columns; j++) {
      const x = j * this.compartmentSize;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
  }

  saveDataToLocalStorage() {
    const savedData = {
      brick: this.brickArray,
      ground: this.groundArray,
      stair: this.stairArray,
      coin: this.coinArray,
      mystery: this.mysteryArray,
      miles: this.milesArray, 
      bridge: this.bridgeArray,
      snail: this.snailArray,
      duck: this.duckArray,
      goomba: this.goombaArray,
      koopa: this.koopaArray,
      pipe: this.pipeArray,
    };

    const jsonString = JSON.stringify(savedData);
    localStorage.setItem('map2Data', jsonString);
  }

  clickHandler(e) {

    //Coordinate x
    const x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / this.compartmentSize) * this.compartmentSize;

    //Coordinate y
    const y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / this.compartmentSize) * this.compartmentSize;

    let isOccupied = false;

    for(let value of this.getAllEntities()){
      console.log(this.getAllEntities())
      if(value[0] == x && value[1] == y){
        isOccupied = true;
        break;
      }
    }
    // Width and height of the clicked compartment
    const widthOfCompartment = this.compartmentSize;
    const heightOfCompartment = this.compartmentSize;

    //Create co-ordinate
    const coordinate = [x, y, widthOfCompartment, heightOfCompartment];

    // Push the coordinates into the appropriate array
    switch (this.currentImage) {
      
      case './assets/images/brick.png':
        let brickCoordinateFound = false;
        for (let value of this.brickArray) {
          if (value[0] === x && value[1] === y) {
            this.brickArray.splice(this.brickArray.indexOf(value), 1);
            this.clear(x,y);
            brickCoordinateFound = true;
            break;
          }
        }
        if (!brickCoordinateFound && !isOccupied) {
          this.brickArray.push(coordinate);
          this.draw(x,y);
        }
        break;

      case './assets/images/ground.png':
        let groundCoordinateFound = false;
        for (let value of this.groundArray) {
          if (value[0] === x && value[1] === y) {
            this.groundArray.splice(this.groundArray.indexOf(value), 1);
            this.clear(x,y);
            groundCoordinateFound = true;
            break;
          }
        }
        if (!groundCoordinateFound && !isOccupied) {
          this.groundArray.push(coordinate);
          this.draw(x,y);
        }
        break;

      case './assets/images/stair.png':
        let stairCoordinateFound = false;
        for (let value of this.stairArray) {
          if (value[0] === x && value[1] === y) {
            this.stairArray.splice(this.stairArray.indexOf(value), 1);
            this.clear(x,y);
            stairCoordinateFound = true;
            break;
          }
        }
        if (!stairCoordinateFound && !isOccupied) {
          this.stairArray.push(coordinate);
          this.draw(x,y);
        }
        break;

      case './assets/images/coin.png':
        let coinCoordinateFound = false;
        for (let value of this.coinArray) {
          if (value[0] === x && value[1] === y) {
            this.coinArray.splice(this.coinArray.indexOf(value), 1);
            this.clear(x,y);
            coinCoordinateFound = true;
            break;
          }
        }
        if (!coinCoordinateFound && !isOccupied) {
          this.coinArray.push(coordinate);
          this.draw(x,y);
        }
        break;

      case './assets/images/mystery.png':
        let mysteryCoordinateFound = false;
        for (let value of this.mysteryArray) {
          if (value[0] === x && value[1] === y) {
            this.mysteryArray.splice(this.mysteryArray.indexOf(value), 1);
            this.clear(x,y);
            mysteryCoordinateFound = true;
            break;
          }
        }
        if (!mysteryCoordinateFound && !isOccupied) {
          this.mysteryArray.push(coordinate);
          this.draw(x,y);
        }
        break;  

        case './assets/images/miles.png':
          let milesCoordinateFound = false;
          for (let value of this.milesArray) {
            if (value[0] === x && value[1] === y) {
              this.milesArray.splice(this.milesArray.indexOf(value), 1);
              this.clear(x,y);
              milesCoordinateFound = true;
              break;
            }
          }
          if (!milesCoordinateFound && !isOccupied) {
            this.milesArray.push(coordinate);
            this.draw(x,y);
          }
          break;

        case './assets/images/bridge.png':
          let bridgeCoordinateFound = false;
          for (let value of this.bridgeArray) {
            if (value[0] === x && value[1] === y) {
              this.bridgeArray.splice(this.bridgeArray.indexOf(value), 1);
              this.clear(x,y);
              bridgeCoordinateFound = true;
              break;
            }
          }
          if (!bridgeCoordinateFound && !isOccupied) {
            this.bridgeArray.push(coordinate);
            this.draw(x,y);
          }
          break;

        case './assets/images/snail.png':
          let snailCoordinateFound = false;
          for (let value of this.snailArray) {
            if (value[0] === x && value[1] === y) {
              this.snailArray.splice(this.snailArray.indexOf(value), 1);
              this.clear(x,y);
              snailCoordinateFound = true;
              break;
            }
          }
          if (!snailCoordinateFound && !isOccupied) {
            this.snailArray.push([x, y, 18, 16]);
            this.draw(x,y);
          }
          break;

        case './assets/images/duck.png':
          let duckCoordinateFound = false;
          for (let value of this.duckArray) {
            if (value[0] === x && value[1] === y) {
              this.duckArray.splice(this.duckArray.indexOf(value), 1);
              this.clear(x,y);
              duckCoordinateFound = true;
              break;
            }
          }
          if (!duckCoordinateFound && !isOccupied) {
            this.duckArray.push([x, y, 17, 24]);
            this.draw(x,y);
          }
          break;

        case './assets/images/goomba.png':
          let goombaCoordinateFound = false;
          for (let value of this.goombaArray) {
            if (value[0] === x && value[1] === y) {
              this.goombaArray.splice(this.goombaArray.indexOf(value), 1);
              this.clear(x,y);
              goombaCoordinateFound = true;
              break;
            }
          }
          if (!goombaCoordinateFound && !isOccupied) {
            this.goombaArray.push([x, y, 16, 16]);
            this.draw(x,y);
          }
          break;

        case './assets/images/koopa.png':
          let koopaCoordinateFound = false;
          for (let value of this.koopaArray) {
            if (value[0] === x && value[1] === y) {
              this.koopaArray.splice(this.koopaArray.indexOf(value), 1);
              this.clear(x,y);
              koopaCoordinateFound = true;
              break;
            }
          }
          if (!koopaCoordinateFound && !isOccupied) {
            this.koopaArray.push([x, y, 16, 24]);
            this.draw(x,y);
          }
          break;

        case './assets/images/pipe.png':
          let pipeCoordinateFound = false;
          for (let value of this.pipeArray) {
            if (value[0] === x && value[1] === y) {
              this.pipeArray.splice(this.pipeArray.indexOf(value), 1);
              this.clear(x,y);
              pipeCoordinateFound = true;
              break;
            }
          }
          if (!pipeCoordinateFound && !isOccupied) {
            this.pipeArray.push([x, y, 32, 64]);
            this.draw(x,y);
          }
          break;
    }

    console.log(`Coordinates: [${x}, ${y}, ${widthOfCompartment}, ${heightOfCompartment}]`);
    console.log(`Brick Array:`, this.brickArray);
    console.log(`Ground Array:`, this.groundArray);
    console.log(`Stair Array:`, this.stairArray);
    console.log(`Coin Array:`, this.coinArray);
    console.log(`Mystery Array:`, this.mysteryArray);
    console.log(`Miles Array:`, this.milesArray);
    console.log(`Bridge Array:`, this.bridgeArray);
    console.log(this.currentImage);
    console.log(isOccupied);
    console.log(Array.isArray(this.paletteImages));

    this.saveDataToLocalStorage();
  }

}

const mapMaker = new MapMaker("map-canvas", 16);
mapMaker.drawMap();