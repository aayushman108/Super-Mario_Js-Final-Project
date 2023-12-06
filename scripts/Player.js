class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.gravity = 1;
    }
    update(input){
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')){
            this.speed = this.maxSpeed;
        }else if(input.includes('ArrowLeft')){
            this.speed = -this.maxSpeed;
        }else{
            this.speed = 0;
        }

        //vertical movement
        this.y += this.vy;
        if(input.includes('Space') && this.onGround()){
            this.vy = -30;
        }else if(!this.onGround()){
            this.vy += this.gravity;
        }else{
            this.vy = 0;
        }
    }
    draw(ctx){
        ctx.fillStyle = "blue";
        ctx.fillRect( this.x, this.y, this.width, this.height);
        //ctx.drawImage();
    }

    //checks if the player is on Ground
    onGround(){
        return this.y >= this.game.height - this.height;
    }
}