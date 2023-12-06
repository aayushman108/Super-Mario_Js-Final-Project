function startGame() {
    // Get the canvas element and its context
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height =window.innerHeight;
    canvas.style.backgroundColor = "pink";

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();
        }
        update(){
            this.player.update(this.input.keys);
        }
        draw(ctx){
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    // Game loop
    function gameLoop() {
        //Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update game state
        game.update();

        // Draw game objects
        game.draw(ctx);

        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
}
startGame();