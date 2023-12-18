
class InputHandler {
    constructor() {
      this.keys = [];
      this.isGamePaused = false;
  
      window.addEventListener('keydown', (e) => {
        if ( 
           (e.code === 'ArrowLeft' ||
            e.code === 'ArrowRight' ||
            e.code === 'Space') &&
          this.keys.indexOf(e.code) === -1
        ) {
          this.keys.push(e.code);
        }

        if (e.code === 'Enter') {
          console.log("enter");
          this.isGamePaused = !this.isGamePaused;
      }
      });
  
      window.addEventListener('keyup', (e) => {
        if (
          e.code === 'ArrowLeft' ||
          e.code === 'ArrowRight' ||
          e.code === 'Space'
        ) {
          this.keys.splice(this.keys.indexOf(e.code), 1);
        }
      });
    }
  }
  
  