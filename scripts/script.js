//Start the game
function startGame(images) {
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
            this.mario = new Mario(this);
            this.input = new InputHandler();
            this.images = images;
        }
        update(){
            this.mario.update(this.input.keys, this.images);
        }
        draw(ctx){
            this.mario.draw(ctx, this.images);
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
