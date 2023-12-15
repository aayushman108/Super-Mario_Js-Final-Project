
class MapMaker{
    constructor(canvasId, compartmentSize) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.compartmentSize = compartmentSize;
        this.colorPalette = document.getElementById('colorPalette');
        this.currentColor = 'black';

        //Color array
        this.redArray = [];
        this.greenArray = [];
        this.blueArray = [];

        //Eventlistener
        this.canvas.addEventListener('click', (e) => this.clickHandler(e));
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

      this.ctx.fillStyle = this.currentColor;
      this.ctx.fillRect(x, y, this.compartmentSize, this.compartmentSize);

      // Calculate the width and height of the clicked compartment
      const widthOfCompartment = this.compartmentSize;
      const heightOfCompartment = this.compartmentSize;

      console.log(`Coordinates: [${x}, ${y}, ${widthOfCompartment}, ${heightOfCompartment}]`);
    }

}

const mapMaker = new MapMaker("map-canvas", 30);
mapMaker.drawMap();