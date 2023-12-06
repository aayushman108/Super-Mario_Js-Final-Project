class InputHandler {
    constructor() {
      this.keys = [];
  
      window.addEventListener('keydown', (e) => {
        if (
          (e.key === 'ArrowUp' ||
            e.key === 'ArrowDown' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Space') &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
      });
  
      window.addEventListener('keyup', (e) => {
        if (
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Space'
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }
  
  