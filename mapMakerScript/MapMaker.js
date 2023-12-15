
class MapMaker{
    constructor(canvasId, compartmentSize) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.compartmentSize = compartmentSize;
        this.colorPalette = document.getElementById('colorPalette');
        this.currentImage = null;
        this.image = new Image();

        //Color array
        this.brickArray = [];
        this.groundArray = [];
        this.stairArray = [];
        this.coinArray = [];
        this.mysteryArray = [];

        //Eventlistener
        this.canvas.addEventListener('click', (e) => this.clickHandler(e));
        this.colorPalette.addEventListener('click', (e) => {
          if (e.target.classList.contains('image')) {
            const image = e.target.style.backgroundImage;
            this.currentImage = image.slice(5, -2);
            this.image.src = this.currentImage;
          }
        });
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

    clickHandler(e) {
      const x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / this.compartmentSize) * this.compartmentSize;
      const y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / this.compartmentSize) * this.compartmentSize;

      this.ctx.drawImage(this.image, x, y, this.compartmentSize, this.compartmentSize);

      // Calculate the width and height of the clicked compartment
      const widthOfCompartment = this.compartmentSize;
      const heightOfCompartment = this.compartmentSize;

      //Create co-ordinate
      const coordinate = [x, y, widthOfCompartment, heightOfCompartment];

      // Push the coordinates into the appropriate array based on the color
      switch (this.currentImage) {
        case 'assets/images/brick.png':
          this.brickArray.push(coordinate);
          break;
        case 'assets/images/ground.png':
          this.groundArray.push(coordinate);
          break;
        case 'assets/images/stair.png':
          this.stairArray.push(coordinate);
          break;
        case 'assets/images/coin.png':
          this.coinArray.push(coordinate);
          break;
        case 'assets/images/mystery.png':
          this.mysteryArray.push(coordinate);
          break;  
      }

      console.log(`Coordinates: [${x}, ${y}, ${widthOfCompartment}, ${heightOfCompartment}]`);
      console.log(`Brick Array:`, this.brickArray);
      console.log(`Ground Array:`, this.groundArray);
      console.log(`Stair Array:`, this.stairArray);
      console.log(`Coin Array:`, this.coinArray);
      console.log(`Mystery Array:`, this.mysteryArray);
    }

}

const mapMaker = new MapMaker("map-canvas", 30);
mapMaker.drawMap();