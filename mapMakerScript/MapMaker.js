class MapMaker{
  constructor(canvasId, compartmentSize) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.compartmentSize = compartmentSize;
      this.imagePalette = document.getElementById('imagePalette');
      this.paletteImages = [...document.getElementsByClassName('image')];
      this.currentImage = null;
      this.image = new Image();
      this.imageArray = [];
      this.entityNames =  ['brick', 'ground', 'stair', 'coin', 'mystery', 'miles', 'bridge', 'snail','pipe', 'koopa','duck', 'goomba', 'castle', 'flagpole'];

      //entity array
      this.entityNames.forEach(item => {
        this[item + 'Array'] = [];
      });

      //Array of palette images
      this.paletteImages.forEach(item => {
        const imageUrl = item.style.backgroundImage;
        const sliceUrl = imageUrl.slice(5, -2);
        const img = new Image();
        img.src = sliceUrl;
        this.imageArray.push(img);
      })

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
  
  /** This method returns coordinate of all items placed in a Map Maker canvas */
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
      ...this.castleArray,
      ...this.flagpoleArray,
    ];
  }
  
  /**
 * This method draws the map items in the canvas
 * @param {HTMLImageElement} image - The image of the map items
 * @param {number} x - The x-coordinate of the map items
 * @param {number} y - The y-coordinate of the map items
 * @param {number} width - The width of the map items
 * @param {number} height - The height of the map items
 */
  draw(image, x, y, width, height){
    this.ctx.drawImage(image, x, y, width, height);
  }

  /** This method draws the grid lines in the canvas */
  drawGrid() {
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

  /** This method clears the canvas */
  clearCanvas(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
  }

  /** 
   * This method draws the entities in the canvas based on the array and image index.
   * @param {Array} entityArray - The array of entities to be drawn
   * @param {number} imageIndex - The index of the image in the imageArray
   */
  drawEntitiesFromArray(entityArray, imageIndex) {
    entityArray.forEach(item => {
      const image = this.imageArray[imageIndex];
      const [x, y, width, height] = item;
      this.draw(image, x, y, width, height);
    });
  }

  /** This method draws all entities from different arrays in the canvas */
  drawAllEntities() {

    // Draw entities for each array
    this.entityNames.forEach((item, index) => {
      this.drawEntitiesFromArray(this[item + 'Array'], index);
    });
  }

  /** This method runs animation loop to clear and draw images in the canvas */
  drawAnimate() {
    const animate = () => {
      // Clear the canvas
      this.clearCanvas();

      // Draw grid lines
      this.drawGrid();

      // Draw entities
      this.drawAllEntities();
  
      requestAnimationFrame(animate);
    };
  
    // Start the animation loop
    animate();
  }

  /** This method sets the arrays of data to the local storage */
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
      castle: this.castleArray,
      flagpole: this.flagpoleArray,
    };

    const jsonString = JSON.stringify(savedData);
    localStorage.setItem('map2Data', jsonString);
  }

  /** This method retrieves and draws the data stored in local storage */
  loadDataFromLocalStorage() {
    const savedDataString = localStorage.getItem('map2Data');

    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);

      // Apply data to the arrays
      this.entityNames.forEach(item => {
        this[item + 'Array'] = savedData[item] || [];
      });

      // Redraw the canvas with the loaded map
      this.drawAnimate();
    }
  }

  /** This method clears the "map2Data" from local storage */
  clearLocalStorage() {
    localStorage.removeItem('map2Data');

    // Clear each array
    this.entityNames.forEach(item => {
      this[item + 'Array'] = [];
    });

    // Redraw the canvas with the updated map
    this.drawAnimate();
  }

  /**
 * This method runs when click event happens in the canvas
 * @param {MouseEvent} e - The click event in the canvas
 */
  clickHandler(e) {

    //Coordinate x
    const x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / this.compartmentSize) * this.compartmentSize;

    //Coordinate y
    const y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / this.compartmentSize) * this.compartmentSize;

    //Cell occupies flag
    let isOccupied = false;

    for(let value of this.getAllEntities()){
      console.log(this.getAllEntities())
      if(value[0] == x && value[1] == y){
        isOccupied = true;
        break;
      }
    }

    // Push the coordinates into the appropriate array
    switch (this.currentImage) {
      
      case './assets/images/brick.png':
        let brickCoordinateFound = false;
        for (let value of this.brickArray) {
          if (value[0] === x && value[1] === y) {
            this.brickArray.splice(this.brickArray.indexOf(value), 1);
            brickCoordinateFound = true;
            break;
          }
        }
        if (!brickCoordinateFound && !isOccupied) {
          this.brickArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
        }
        this.drawAnimate();
        break;

      case './assets/images/ground.png':
        let groundCoordinateFound = false;
        for (let value of this.groundArray) {
          if (value[0] === x && value[1] === y) {
            this.groundArray.splice(this.groundArray.indexOf(value), 1);
            groundCoordinateFound = true;
            break;
          }
        }
        if (!groundCoordinateFound && !isOccupied) {
          this.groundArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
        }
        this.drawAnimate();
        break;

      case './assets/images/stair.png':
        let stairCoordinateFound = false;
        for (let value of this.stairArray) {
          if (value[0] === x && value[1] === y) {
            this.stairArray.splice(this.stairArray.indexOf(value), 1);
            stairCoordinateFound = true;
            break;
          }
        }
        if (!stairCoordinateFound && !isOccupied) {
          this.stairArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
        }
        this.drawAnimate();
        break;

      case './assets/images/coin.png':
        let coinCoordinateFound = false;
        for (let value of this.coinArray) {
          if (value[0] === x && value[1] === y) {
            this.coinArray.splice(this.coinArray.indexOf(value), 1);
            coinCoordinateFound = true;
            break;
          }
        }
        if (!coinCoordinateFound && !isOccupied) {
          this.coinArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
        }
        this.drawAnimate();
        break;

      case './assets/images/mystery.png':
        let mysteryCoordinateFound = false;
        for (let value of this.mysteryArray) {
          if (value[0] === x && value[1] === y) {
            this.mysteryArray.splice(this.mysteryArray.indexOf(value), 1);
            mysteryCoordinateFound = true;
            break;
          }
        }
        if (!mysteryCoordinateFound && !isOccupied) {
          this.mysteryArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
        }
        this.drawAnimate();
        break;  

        case './assets/images/miles.png':
          let milesCoordinateFound = false;
          for (let value of this.milesArray) {
            if (value[0] === x && value[1] === y) {
              this.milesArray.splice(this.milesArray.indexOf(value), 1);
              milesCoordinateFound = true;
              break;
            }
          }
          if (!milesCoordinateFound && !isOccupied) {
            this.milesArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/bridge.png':
          let bridgeCoordinateFound = false;
          for (let value of this.bridgeArray) {
            if (value[0] === x && value[1] === y) {
              this.bridgeArray.splice(this.bridgeArray.indexOf(value), 1);
              bridgeCoordinateFound = true;
              break;
            }
          }
          if (!bridgeCoordinateFound && !isOccupied) {
            this.bridgeArray.push([x, y, COMMON_WIDTH, COMMON_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/snail.png':
          let snailCoordinateFound = false;
          for (let value of this.snailArray) {
            if (value[0] === x && value[1] === y) {
              this.snailArray.splice(this.snailArray.indexOf(value), 1);
              snailCoordinateFound = true;
              break;
            }
          }
          if (!snailCoordinateFound && !isOccupied) {
            this.snailArray.push([x, y, SNAIL_WIDTH, SNAIL_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/duck.png':
          let duckCoordinateFound = false;
          for (let value of this.duckArray) {
            if (value[0] === x && value[1] === y) {
              this.duckArray.splice(this.duckArray.indexOf(value), 1);
              duckCoordinateFound = true;
              break;
            }
          }
          if (!duckCoordinateFound && !isOccupied) {
            this.duckArray.push([x, y, DUCK_WIDTH, DUCK_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/goomba.png':
          let goombaCoordinateFound = false;
          for (let value of this.goombaArray) {
            if (value[0] === x && value[1] === y) {
              this.goombaArray.splice(this.goombaArray.indexOf(value), 1);
              goombaCoordinateFound = true;
              break;
            }
          }
          if (!goombaCoordinateFound && !isOccupied) {
            this.goombaArray.push([x, y, GOOMBA_WIDTH, GOOMBA_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/koopa.png':
          let koopaCoordinateFound = false;
          for (let value of this.koopaArray) {
            if (value[0] === x && value[1] === y) {
              this.koopaArray.splice(this.koopaArray.indexOf(value), 1);
              koopaCoordinateFound = true;
              break;
            }
          }
          if (!koopaCoordinateFound && !isOccupied) {
            this.koopaArray.push([x, y, KOOPA_WIDTH, KOOPA_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/pipe.png':
          let pipeCoordinateFound = false;
          for (let value of this.pipeArray) {
            if (value[0] === x && value[1] === y) {
              this.pipeArray.splice(this.pipeArray.indexOf(value), 1);
              pipeCoordinateFound = true;
              break;
            }
          }
          if (!pipeCoordinateFound && !isOccupied) {
            this.pipeArray.push([x, y, PIPE_WIDTH, PIPE_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/castle.png':
          let castleCoordinateFound = false;
          for (let value of this.castleArray) {
            if (value[0] === x && value[1] === y) {
              this.castleArray.splice(this.castleArray.indexOf(value), 1);
              castleCoordinateFound = true;
              break;
            }
          }
          if (!castleCoordinateFound && !isOccupied) {
            this.castleArray.push([x, y, CASTLE_WIDTH, CASTLE_HEIGHT]);
          }
          this.drawAnimate();
          break;

        case './assets/images/flagpole.png':
          let flagpoleCoordinateFound = false;
          for (let value of this.flagpoleArray) {
            if (value[0] === x && value[1] === y) {
              this.flagpoleArray.splice(this.flagpoleArray.indexOf(value), 1);
              flagpoleCoordinateFound = true;
              break;
            }
          }
          if (!flagpoleCoordinateFound && !isOccupied) {
            this.flagpoleArray.push([x, y, FLAGPOLE_WIDTH, FLAGPOLE_HEIGHT]);
          }
          this.drawAnimate();
          break;
    }

    this.saveDataToLocalStorage();
  }

}

const mapMaker = new MapMaker("map-canvas", 16);
mapMaker.drawGrid();

/** This function runs to clear the "map2Data" from local storage */
function resetMap(){
  mapMaker.clearLocalStorage();
}

/** This function runs to clear the "map2Data" from local storage */
function prevMap(){
  mapMaker.loadDataFromLocalStorage();
}