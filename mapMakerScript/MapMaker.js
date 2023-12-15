
class MapMaker{
    constructor(canvasId, compartmentSize) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.compartmentSize = compartmentSize;
        this.colorPalette = document.getElementById('colorPalette');
        this.currentColor = 'black';

        this.redArray = [];
        this.greenArray = [];
        this.blueArray = [];
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
}

const mapMaker = new MapMaker("map-canvas", 30);
mapMaker.drawMap();