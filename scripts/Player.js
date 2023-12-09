
class Mario{
    constructor(game){
        this.game = game;
        this.spritesheets = this.game.images;
        this.image = new Sprite(this.spritesheets.marioRight, 80, 32.5, 15, 15);
        this.width = 16;
        this.height = 16;
        this.x = 0;
        this.y = 10;//this.game.height - this.height;
        this.speed = 0;
        this.maxSpeed = 2;
        this.vy = 0;
        this.gravity = 0.6;
        //this.states = ["standingLeft", "standingRight", "runningLeft", "runningRight", "jumpingLeft", "jumpingRight"];
        //this.currentState = this.states[0];
        this.lastKey = [];
        this.nature = this.game.level.nature;
        this.isJumping = false;

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

        };

    }

    //Update
    update(input){
        this.checkCollision();
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')){
            this.lastKey = [...input];
            this.speed = this.maxSpeed;
            if(!this.isJumping){
                this.image = this.stateObject.runningRight.frames[this.stateObject.runningRight.count];
                this.stateObject.runningRight.count++;
                if(this.stateObject.runningRight.count > 2){
                    this.stateObject.runningRight.count = 0;
                }
            }
        }else if(input.includes('ArrowLeft') && this.x > 0){
            this.lastKey = [...input];
            this.speed = -this.maxSpeed;
            if(!this.isJumping){
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
        if(input.includes('Space')){
            if(!this.isJumping){
                this.vy = -10;
                this.isJumping = true;
                if(this.lastKey.includes("ArrowLeft")){
                    this.image = this.stateObject.jumpingLeft;
                }else{
                    this.image = this.stateObject.jumpingRight;
                }
            }else if(this.isJumping){
                this.vy += this.gravity;
                if(input.includes("ArrowLeft") || this.lastKey.includes("ArrowLeft")){
                    this.image = this.stateObject.jumpingLeft;
                }else{
                    this.image = this.stateObject.jumpingRight;
                }
            }
        }else{
            if(!this.isJumping){
                this.vy = 0;
                this.isJumping = true;
            }else{
                this.vy += this.gravity;
                if(input.includes("ArrowLeft") || this.lastKey.includes("ArrowLeft")){
                    this.image = this.stateObject.jumpingLeft;
                }else{
                    this.image = this.stateObject.jumpingRight;
                }
            }
        }
    }
    
    //Draw
    draw(ctx){
        ctx.drawImage(this.image.image, this.image.sx, this.image.sy, this.image.sw, this.image.sh, this.x, this.y, this.width, this.height);
    }

    //Collision
    checkCollision(){
        this.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Ground collision
                if(item.type === "ground"){
                    if(this.y < item.y && this.vy >=0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.isJumping = false;
                        console.log("collision detected")
                    }
                }

                //Collision with pipe
                if(item.type === "pipe" || item.type === "stair"){
                    //left
                    if(this.x < item.x && this.y >= item.y){
                        this.x = item.x - this.width;
                    }
                    //right
                    if(this.x > item.x && this.y >= item.y){
                        this.x = item.x + item.width;
                    }
                    //top
                    if(this.y < item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy >= 0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.isJumping = false;
                    }
                } 

            }
        })
    }
}