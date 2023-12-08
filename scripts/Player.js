
class Mario{
    constructor(game){
        this.game = game;
        this.spritesheets = this.game.images;
        this.image = new Sprite(this.spritesheets.marioRight, 80, 32.5, 15, 15);
        this.width = 18;
        this.height = 18;
        this.x = 0;
        this.y = 192 - this.height;//this.game.height - this.height;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.gravity = 1;
        //this.states = ["standingLeft", "standingRight", "runningLeft", "runningRight", "jumpingLeft", "jumpingRight"];
        //this.currentState = this.states[0];
        this.lastKey = [];

        //Mario states
        this.stateObject = {
            standingLeft : new Sprite(this.spritesheets.marioLeft, 80, 32.5, 15, 16),
        
            standingRight : new Sprite(this.spritesheets.marioRight, 80, 32.5, 15, 16),
        
            runningLeft : {frames: [ new Sprite(this.spritesheets.marioLeft, 96, 32.5, 15, 16),
                            new Sprite(this.spritesheets.marioLeft, 113, 32.5, 15, 16),
                            new Sprite(this.spritesheets.marioLeft, 128, 32.5, 15, 16)],
                        count: 0},
        
            runningRight : {frames: [new Sprite(this.spritesheets.marioRight, 96, 32, 15, 16),
                             new Sprite(this.spritesheets.marioRight, 113, 32, 15, 16),
                             new Sprite(this.spritesheets.marioRight, 128, 32, 15, 16)],
                            count: 0},
            
            jumpingLeft : new Sprite(this.spritesheets.marioLeft, 160, 32.5, 16, 16),

            jumpingRight : new Sprite(this.spritesheets.marioRight, 160, 32.5, 16, 16),

        }
    }

    update(input, images, canvas){
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')){
            this.lastKey = [...input];
            this.speed = this.maxSpeed;
            if(this.onGround()){
                this.image = this.stateObject.runningRight.frames[this.stateObject.runningRight.count];
                this.stateObject.runningRight.count++;
                if(this.stateObject.runningRight.count > 2){
                    this.stateObject.runningRight.count = 0;
                }
            }
        }else if(input.includes('ArrowLeft') && this.x > 0){
            this.lastKey = [...input];
            this.speed = -this.maxSpeed;
            if(this.onGround()){
                this.image = this.stateObject.runningLeft.frames[this.stateObject.runningLeft.count];
                this.stateObject.runningLeft.count++;
                if(this.stateObject.runningLeft.count > 2){
                    this.stateObject.runningLeft.count = 0;
                }
            }
        }else{
            this.speed = 0;
            if(this.lastKey.includes("ArrowLeft")){
                this.image = this.stateObject.standingLeft;
            }else{
                this.image = this.stateObject.standingRight;
            }
        }

        //vertical movement
        this.y += this.vy;
        if(input.includes('Space') && this.onGround()){
            this.vy = -15;
            if(this.lastKey.includes("ArrowLeft")){
                this.image = this.stateObject.jumpingLeft;
            }else{
                this.image = this.stateObject.jumpingRight;
            }
        }else if(!this.onGround()){
            this.vy += this.gravity;
            if(input.includes("ArrowLeft") || this.lastKey.includes("ArrowLeft")){
                this.image = this.stateObject.jumpingLeft;
            }else{
                this.image = this.stateObject.jumpingRight;
            }
        }else{
            this.vy = 0;
        }
    }
    
    draw(ctx){
        // ctx.fillStyle = "blue";
        // ctx.fillRect( this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image.image, this.image.sx, this.image.sy, this.image.sw, this.image.sh, this.x, this.y, this.width, this.height);
    }

    //checks if the player is on Ground
    onGround(){
        return this.y >= 192 - this.height;//this.game.height - this.height;
    }
}