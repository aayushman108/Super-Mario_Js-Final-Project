
class Mario{
    constructor(game){
        this.game = game;
        this.ctx = this.game.ctx;
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
        this.level = this.game.level;
        this.isJumping = false;
        this.isDead = false;

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

            marioDead : new Sprite(this.spritesheets.marioLeft, 176, 32, 16, 16),

        };

    }

    //Update
    update(input, animateFrame){
        this.checkCollision();
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')){
            this.lastKey = [...input];
            this.speed = this.maxSpeed;
            if(!this.isJumping && animateFrame % 3 === 0){
                this.image = this.stateObject.runningRight.frames[this.stateObject.runningRight.count];
                this.stateObject.runningRight.count++;
                if(this.stateObject.runningRight.count > 2){
                    this.stateObject.runningRight.count = 0;
                }
            }
        }else if(input.includes('ArrowLeft') && this.x > 0){
            this.lastKey = [...input];
            this.speed = -this.maxSpeed;
            if(!this.isJumping && animateFrame % 3 === 0){
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
        if(this.isDead){
            this.image = this.stateObject.marioDead;
            this.y += this.vy;
            this.vy = 2;
            this.vy -= this.gravity;
        }else{
            this.y += this.vy;
        }
        if(input.includes('Space') && !this.isDead){
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
        }else if(!this.isDead){
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
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image.image, this.image.sx, this.image.sy, this.image.sw, this.image.sh, this.x, this.y, this.width, this.height);
    }

    //Collision
    checkCollision(){
        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Ground collision
                if(item.type === "ground"){
                    if(this.y < item.y && this.vy >=0){
                        if(!this.isDead){
                            this.y = item.y - this.height + 0.5;
                            this.vy = 0;
                            this.isJumping = false;
                        }
                    }
                }

                //Collision with pipe and stair
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

                //Collision with bricks
                if(item.type === "brick"){
                    //left
                    if(this.x < item.x && this.y >= item.y){
                        this.x = item.x - this.width + 0.2;
                    }
                    //right
                    if(this.x > item.x && this.y >= item.y){
                        this.x = item.x + item.width - 0.2;
                    }
                    //top
                    if(this.y < item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy >= 0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.isJumping = false;
                    }
                    //bottom
                    if(this.y > item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy <= 0){
                        this.y = item.y + item.height;
                        this.vy = 1;
                    }

                }
            }

        })

        this.level.enemies.forEach( item => {
            if(collisionDetection(item, this)){
                
                //collision with Goomba
                if( item.type === "goomba"){
                    //Left collision
                    if( this.x < item.x && this.y >= item.y && item.dead === false){
                        this.isDead = true;
                    }
                    //Right collision
                    if( this.x > item.x && this.y >= item.y && item.dead === false){
                        this.isDead = true;
                    }
                    //Top collision
                    if(this.y < item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy >= 0){
                        item.dead = true;
                        item.speed = 0;
                    }
                }

                //Collision with Koopa
                if( item.type === "koopa"){}
            }
        })

        //Rewards
        this.level.rewards.forEach( item => {
            if(collisionDetection(item, this)){
                //collision with coin
                if(item.type === "coin"){
                    item.removeCoin = true;
                }

                if(item.type === "mystery box"){

                    //bottom collision
                    if(this.y > item.y){
                        this.y = item.y + item.height;
                        this.vy = 1;
                        item.emptyBox = true;
                    }
                }
            }
        })

    }
}