
// Start the game
function startGame(images) {
    // Get the canvas element and its context
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "pink";

    
    // Camera
    const camera = { x: 0, y: 0, target: null, easing: 0.1 };

    //Scaling
    const scaleFactor = 3;

    //Animate frame
    let animateFrame = 0;
  
    class Game {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.input = new InputHandler();
        this.images = images;
        this.level = new Level(levelOne, this.images);
        this.mario = new Mario(this);
      }
  
      update(animateFrame) {
        // Set the camera target to the Mario character
        camera.target = this.mario;
  
        // Update camera position based on target position
        if (camera.target) {
          camera.x = Math.max(0, camera.target.x - canvas.width / (2 * scaleFactor));
        }
  
        this.level.update(animateFrame);
        this.mario.update(this.input.keys, animateFrame);
      }
  
      draw(ctx) {
        // Translate the context based on the camera position
        ctx.translate(-camera.x, -camera.y);
  
        this.level.draw(ctx);
        this.mario.draw(ctx);
  
        // Reset the translation
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  
    const game = new Game(canvas.width, canvas.height);
  
    // Game loop
    function gameLoop() {
      //Animate frame
      animateFrame++;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);
  
      // Update game state
      game.update(animateFrame);
  
      // Draw game objects
      game.draw(ctx);
  
      requestAnimationFrame(gameLoop);
    }
  
    // Start the game loop
    gameLoop();
  }
  