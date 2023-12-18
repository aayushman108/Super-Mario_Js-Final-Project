
// Start the game
function startGame(images) {
    // Get the canvas element and its context
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "pink";
    ctx.font = '400 30px Creepster, sans-serif';

    // Camera
    const camera = { x: 0, y: 0, target: null, easing: 0.1 };

    //Scaling
    const scaleFactor = GAME_SCALE;

    //Animate frame
    let animateFrame = 0;

    //Game start time 
    let startTime = Date.now();
    let targetTime = 300;

    //Creating game class
    class Game {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.input = new InputHandler();
        this.images = images;
        this.level = new Level(levelOne, this.images, this);
        this.mario = new Mario(this);
        this.gameOver = false; 
        this.bonusTaken = false;
      }
  
      update(animateFrame) {
        // Set the camera target to the Mario character
        camera.target = this.mario;
  
        // Update camera position based on target position
        if (camera.target) {
          camera.x = Math.max(0, camera.target.x - canvas.width / (2 * scaleFactor));
        }

        //level update
        this.level.update(animateFrame);
        //Mario update
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

      //function to display gameover banner
      gameComplete(){
        if(!this.bonusTaken){
          const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
          const timeBonus = Math.max(0, targetTime - elapsedTimeInSeconds);
          this.mario.score += timeBonus; 
          this.bonusTaken = true;
        }
        ctx.fillStyle = 'black';
        ctx.font = '400 30px Creepster, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height/3);
        ctx.fillText(`Score : ${this.mario.score}`, canvas.width/2, canvas.height/2.5);
      }
    }

    //Game object
    const game = new Game(canvas.width, canvas.height);
  
    // Game loop
    function gameLoop() {

      if(!game.input.isGamePaused){
        //Animate frame
        animateFrame++;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update game state
        game.update(animateFrame);
  
        // Draw game objects
        game.draw(ctx);

        if(!game.gameOver){
          //Score
          ctx.fillText(`score: ${game.mario.score}`, 70, 50);
          //Time
          const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
          ctx.fillText("Time: " + Math.ceil(elapsedTimeInSeconds) + " seconds", 300, 50);
          ctx.fillText(`Target Time: ${targetTime} seconds`, 600, 50);
        }

        //game sound
        if(!game.mario.isDead && !game.gameOver){
          start.play();
        }else if(game.mario.isDead && !game.gameOver){
          start.pause();
          setTimeout(() => location.reload(), 2000);
        }else if(game.gameOver){
          start.pause();
          setTimeout(() => location.reload(), 6000);
          game.gameComplete();
        }
      }

      if(game.input.isGamePaused){
        start.pause();
      }

      //scale playground
      ctx.scale(scaleFactor, scaleFactor);
  
      requestAnimationFrame(gameLoop);
    }
  
    // Start the game loop
    gameLoop();

  }
  