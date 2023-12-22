/**
 * This function initiates the game.
 * @param {Array} images - The array of preloaded image objects.
 */
function startGame(images) {
  // Get the canvas element and its context
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = "pink";
  ctx.font = "400 30px Creepster, sans-serif";

  // Camera
  const camera = { x: 0, y: 0, target: null, easing: 0.1 };

  //Scaling
  const scaleFactor = GAME_SCALE;

  //Animate frame
  let animateFrame = 0;

  //Game start time
  let startTime = Date.now();
  let targetTime = 300;

  const level = getQueryParam("level");
  let goLevel = null;
  switch (level) {
    case "levelOne":
      goLevel = levelOne;
      break;
    case "buildLevel":
      goLevel = buildLevel;
      break;
  }

  //Creating game class
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.ctx = ctx;
      this.input = new InputHandler();
      this.images = images;
      this.level = new Level(goLevel, this.images, this);
      this.mario = new Mario(this);
      this.score = 0;
      this.powerState = null;
      this.gameOver = false;
      this.bonusTaken = false;
      this.nextLevel = false;
    }

    /** This method resets the game for next level */
    reset() {
      const currentScore = this.score;
      const currentPower = this.powerState;

      // Clear the current level
      this.level = null;
      //this.mario = null; // Clear the current player

      // Initialize a new level
      this.level = new Level(levelTwo, this.images, this);
      console.log(levelTwo);
      // Initialize a new player
      this.mario = new Mario(this);

      //set Mario score
      this.mario.score = currentScore;

      //set Mario Power
      this.mario.marioPowerState = currentPower;

      // Reset flags
      this.gameOver = false;
      this.bonusTaken = false;
      this.nextLevel = false;
    }

    /**
     * This method calls the update() method of the various entities.
     * @param {number} animateFrame - The animation step.
     */
    update(animateFrame) {
      // const level = getQueryParam('level');
      // Set the camera target to the Mario character
      camera.target = this.mario;

      // Update camera position based on target position
      if (camera.target) {
        camera.x = Math.max(
          0,
          camera.target.x - canvas.width / (2 * scaleFactor)
        );
      }

      //level update
      this.level.update(animateFrame);

      //Mario update
      this.mario.update(this.input.keys, animateFrame);

      //Mario score
      this.score = this.mario.score;

      //Mario power
      this.powerState = this.mario.marioPowerState;
    }

    /**
     * This method calls the draw() method of various entities
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
      // Translate the context based on the camera position
      ctx.translate(-camera.x, -camera.y);

      this.level.draw(ctx);
      this.mario.draw(ctx);

      // Reset the translation
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    /** This method runs when the game completes or wins */
    gameComplete() {
      if (!this.bonusTaken) {
        const elapsedTimeInSeconds = Math.floor(
          (Date.now() - startTime) / 1000
        );
        const timeBonus = Math.max(0, targetTime - elapsedTimeInSeconds);
        this.mario.score += timeBonus;
        this.bonusTaken = true;
      }
      ctx.fillStyle = "black";
      ctx.font = "400 30px Creepster, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Win", canvas.width / 2, canvas.height / 3);
      ctx.fillText(
        `Score : ${this.score}`,
        canvas.width / 2,
        canvas.height / 2.5
      );
    }
  }

  //Game object
  const game = new Game(canvas.width, canvas.height);

  /** This method runs the animation loop */
  function gameLoop() {
    if (!game.input.isGamePaused) {
      //Animate frame
      animateFrame++;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update game state
      game.update(animateFrame);

      // Draw game objects
      game.draw(ctx);

      if (!game.gameOver) {
        //Score
        ctx.fillText(`score: ${game.score}`, 70, 50);
        //Time
        const elapsedTimeInSeconds = Math.floor(
          (Date.now() - startTime) / 1000
        );
        ctx.fillText(
          "Time: " + Math.ceil(elapsedTimeInSeconds) + " seconds",
          300,
          50
        );
        ctx.fillText(`Target Time: ${targetTime} seconds`, 600, 50);
      }

      //game sound
      if (!game.mario.isDead && !game.gameOver) {
        start.play();
      } else if (game.mario.isDead && !game.gameOver) {
        start.pause();
        setTimeout(() => location.reload(), 2000);
      } else if (game.gameOver) {
        start.pause();
        setTimeout(() => (game.nextLevel = true), 3000);
        game.gameComplete();
      }
    }

    //Entering to next level
    if (game.nextLevel) {
      // Reset the game for the next level
      game.reset();
    }

    if (game.input.isGamePaused) {
      start.pause();
    }

    //scale playground
    ctx.scale(scaleFactor, scaleFactor);

    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}
