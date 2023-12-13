
class Mario{
    constructor(game){
        this.game = game;
        this.gameHeight = this.game.height;
        this.ctx = this.game.ctx;
        this.spritesheets = this.game.images;
        this.image = new Sprite(this.spritesheets.marioRight, 80, 32.5, 15, 15);
        this.width = 16;
        this.height = 16;
        this.x = 0;
        this.y = 10;
        this.speed = 0;
        this.maxSpeed = 2;
        this.vy = 0;
        this.gravity = 0.6;
        this.lastKey = [];
        this.level = this.game.level;
        this.isJumping = false;
        this.isDead = false;
        this.score = 0;
        this.powerUpOccurred = {
            50: false,
            100: false,
            200: false
        };

        this.visible = true;

        //Mario states
        this.stateObject = {
            standingLeft : new Sprite(this.spritesheets.marioLeft, 80, 32.5, 15, 16),
        
            standingRight : new Sprite(this.spritesheets.marioRight, 80, 32.5, 15, 16),
        
            runningLeft : {frames: [ new Sprite(this.spritesheets.marioLeft, 96, 32.5, 15, 16),
                            new Sprite(this.spritesheets.marioLeft, 113, 32.5, 15, 16),
                            new Sprite(this.spritesheets.marioLeft, 128, 32.5, 15, 16)],
                        count: 0},
        
            runningRight : {frames: [new Sprite(this.spritesheets.marioRight, 96, 32.5, 15, 16),
                             new Sprite(this.spritesheets.marioRight, 113, 32.5, 15, 16),
                             new Sprite(this.spritesheets.marioRight, 128, 32.5, 15, 16)],
                            count: 0},
            
            jumpingLeft : new Sprite(this.spritesheets.marioLeft, 160, 32.5, 16, 16),

            jumpingRight : new Sprite(this.spritesheets.marioRight, 160, 32.5, 16, 16),

            marioDead : new Sprite(this.spritesheets.marioLeft, 176, 32, 16, 16),

        };

    }

    //Update
    update(input, animateFrame){

        //call for collision check
        this.checkCollision();

        //call for score check
        this.checkScore();

        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight') && this.x < 3300){
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
                if(this.score >= 100){
                    this.vy = -12;
                }
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

        if(this.y > this.gameHeight){
            console.log(this.gameHeight);
            this.isDead = true;
        }

        if(this.isDead){
            this.score = 0;
            marioDeath.play();
        }

        if(this.score < -10){
            this.isDead = true;
        }

        if(this.x >= 3300){
            this.game.gameOver = true;
            complete.play();
        }
    }
    
    //Draw
    draw(ctx){
        if(this.visible){
            ctx.drawImage(this.image.image, this.image.sx, this.image.sy, this.image.sw, this.image.sh, this.x, this.y, this.width, this.height);
        }
    }

    //function to check collision
    checkCollision(){
        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Collision with grounds
                if(item.type === "ground"){
                    if(this.y < item.y && this.vy >=0){
                        if(!this.isDead){
                            this.y = item.y - this.height + 0.5;
                            this.vy = 0;
                            this.isJumping = false;
                        }
                    }
                }

                //Collision with pipes and stairs
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
                        this.x = item.x - this.width + 0.01;
                    }
                    //right
                    if(this.x > item.x && this.y >= item.y){
                        this.x = item.x + item.width - 0.01;
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
                        this.vy = 0.5;

                        if(this.score >= 100){
                            //Break the brick
                            this.level.nature.splice(this.level.nature.indexOf(item), 1);
                            let brickParticle = new ParticleSystem(this.spritesheets.tiles, item.x, item.y - 8, 2);
                            if (brickParticle) {
                                brickParticle.update();
                                brickParticle.draw(this.ctx);
                            }
                        }else{
                            this.score = this.score - 5;
                        }
                    }

                }
            }

        })

        //Enemies
        this.level.enemies.forEach( item => {
            if(collisionDetection(item, this)){
                
                //collision with Goomba
                if( item.type === "goomba" && item.isDead === false){
                    //Left collision
                    if( this.x < item.x && this.y >= item.y){
                        this.isDead = true;
                    }
                    //Right collision
                    if( this.x > item.x && this.y >= item.y){
                        this.isDead = true;
                    }
                    //Top collision
                    if(this.y < item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy >= 0){
                        item.isDead = true;
                        item.speed = 0;
                        this.score = this.score + 10;
                        killEnemy.currentTime = 0;
                        killEnemy.play();
                    }
                }

                //Collision with Koopa
                if( item.type === "koopa" && item.isDead === false){
                    //Left collision
                    if( this.x < item.x && this.y >= item.y){
                        this.isDead = true;
                    }
                    //Right collision
                    if( this.x > item.x && this.y >= item.y){
                        this.isDead = true;
                    }
                    //Top collision
                    if(this.y < item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy >= 0){
                        item.isDead = true;
                        item.speed = 0;
                        this.score = this.score + 10;
                        killEnemy.currentTime = 0;
                        killEnemy.play();
                    }

                }
            }
        })

        //Rewards
        this.level.rewards.forEach( item => {
            if(collisionDetection(item, this)){
                //collision with coin
                if(item.type === "coin"){
                    item.removeCoin = true;
                    this.score = this.score + 10;
                    coin.currentTime = 0;
                    coin.play();
                }

                //collision with Mystery box
                if(item.type === "mystery box"){

                    //top collision
                    if(this.y < item.y){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.isJumping = false;
                    }

                    //bottom collision
                    if(this.y > item.y){
                        item.collisionCount++;
                        this.y = item.y + item.height;
                        this.vy = 1;
                        item.emptyBox = true;
                        
                        if(item.collisionCount === 1){
                            let random = getRandomNumber(1, 2);
                            jump.currentTime = 0;
                            jump.play();
                            if(random === 1){
                                item.generateMushroom();
                            }else if(random === 2){
                                item.generateCoin();
                            }
                        }
                    }
                }

                //Collision with mushroom
                if(item.type === "mushroom"){
                    item.isConsumed = true;
                    this.score = this.score + 25;
                    mushroom.currentTime = 0;
                    mushroom.play();
                }
            }
        })

    }

    //Check power up and play sound
    checkPowerUp(score) {
        if (this.powerUpOccurred[score] === false) {
            powerUp.play();
            this.powerUpOccurred[score] = true;

            //Mario blinking during power increase
            let blinkInterval = setInterval(() => {
                this.visible = !this.visible;
            }, 50);
        
            // After blinkDuration, make Mario completely visible
            setTimeout(() => {
                this.visible = true;
                clearInterval(blinkInterval);
            }, 1500);
        }
    }
    //Check score 
    checkScore() {
        if (this.score >= 50) {
            this.width = 20;
            this.height = 20;
            this.checkPowerUp(50);
        }
        if (this.score >= 100) {
            this.checkPowerUp(100);
        }
        if (this.score >= 200) {
            this.checkPowerUp(200);
        }
    }
}