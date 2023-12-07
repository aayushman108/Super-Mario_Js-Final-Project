class Mario{
    constructor(game){
        this.game = game;
        this.width = 45;
        this.height = 48;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.gravity = 1;
        this.states = ["standingLeft", "standingRight", "runningLeft", "runningRight", "jumpingLeft", "jumpingRight"];
        this.currentState = this.states[0];
    }
    update(input, images){
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')){
            this.speed = this.maxSpeed;
            this.currentState = this.states[3];
            console.log(this.currentState);
        }else if(input.includes('ArrowLeft')){
            this.speed = -this.maxSpeed;
            this.currentState = this.states[2]
            console.log(this.currentState);
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
    draw(ctx, images){
        // ctx.fillStyle = "blue";
        // ctx.fillRect( this.x, this.y, this.width, this.height);
        ctx.drawImage(images[0], 80, 32.5, 15, 16, this.x, this.y, this.width, this.height);
    }

    //checks if the player is on Ground
    onGround(){
        return this.y >= this.game.height - this.height;
    }
}