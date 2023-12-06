class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.speed = 0;
        this.maxSpeed = 10;
    }
    update(input){
    }
    draw(ctx){
        ctx.fillStyle = "blue";
        ctx.fillRect( this.x, this.y, this.width, this.height);
        //ctx.drawImage();
    }
}