
class Mario{
    constructor(game){
        this.game = game;
        this.gameHeight = this.game.height;
        this.ctx = this.game.ctx;
        this.spritesheets = this.game.images;
        this.image = new Sprite(this.spritesheets.marioRight, 80, 32.5, 15, 15);
        this.width = SMALL_MARIO_WIDTH;
        this.height = SMALL_MARIO_HEIGHT;
        this.x = 40;
        this.y = 170;
        this.vx = 0;
        this.vy = 0;
        this.gravity = GRAVITY;
        this.lastKey = [];
        this.level = this.game.level;
        this.isJumping = false;
        this.isDead = false;
        this.score = 0;
        this.marioPowerState = "small"; //"small", "medium", "large"

        //blinking effect of mario on power gain
        this.visible = true;
        //for breaking brick
        this.brickParticle = null;
        //reward consumed
        this.noOfMushroomConsumed = 0;
        this.noOfFlowerConsumed = 0;

        //Fire bullet
        this.canFireBullet = false;
        this.isbulletFired = false;
        document.addEventListener('keyup', (e) => {
            if (e.code === 'KeyB') {
              this.isBulletFired = true;
              this.lastKey.splice(this.lastKey.indexOf("KeyB"), 1);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyB') {
              this.lastKey.push("KeyB");
            }
        });

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
            marioBombLeft : new Sprite(this.spritesheets.marioLeft, 160, 0, 16, 32),
            marioBombRight : new Sprite(this.spritesheets.marioRight, 160, 0, 16, 32),
        };

    }

    //Update
    update(input, animateFrame){
        if (this.brickParticle) {
            this.brickParticle.update();
        }

        //call for collision check
        this.checkCollision();

        // //call for score check
        // this.checkScore();

        //horizontal movement
        this.x += this.vx;
        if(input.includes('ArrowRight') && this.x < 4800){
            this.lastKey = [...input];
            this.vx = MARIO_SPEED;
            if(!this.isJumping && animateFrame % 3 === 0){
                this.image = this.stateObject.runningRight.frames[this.stateObject.runningRight.count];
                this.stateObject.runningRight.count++;
                if(this.stateObject.runningRight.count > 2){
                    this.stateObject.runningRight.count = 0;
                }
            }
        }else if(input.includes('ArrowLeft') && this.x > 0){
            this.lastKey = [...input];
            this.vx = -MARIO_SPEED;
            if(!this.isJumping && animateFrame % 3 === 0){
                this.image = this.stateObject.runningLeft.frames[this.stateObject.runningLeft.count];
                this.stateObject.runningLeft.count++;
                if(this.stateObject.runningLeft.count > 2){
                    this.stateObject.runningLeft.count = 0;
                }
            }
        }else{
            this.vx = 0;
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
            this.vy = DEAD_MARIO_VERTICAL_VELOCITY;
            this.vy -= this.gravity;
        }else{
            this.y += this.vy;
        }
        if(input.includes('Space') && !this.isDead){
            if(!this.isJumping){
                this.vy = -SMALL_MARIO_VERTICAL_VELOCITY;
                if(this.marioPowerState === "medium" || this.marioPowerState === "large"){
                    this.vy = -MEDIUM_MARIO_VERTICAL_VELOCITY;
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
        
        if(this.lastKey.includes("KeyB") && !this.isDead){
            if(input.includes("ArrowLeft") || this.lastKey.includes("ArrowLeft")){
                this.image = this.stateObject.marioBombLeft;
            }else{
                this.image = this.stateObject.marioBombRight;
            }
        }

        if(this.y > this.gameHeight){
            this.isDead = true;
        }

        if(this.isDead){
            this.score = 0;
            marioDeath.play();
        }

        // if(this.score < -10){
        //     this.isDead = true;
        // }

        if(this.x >= 4800){
            this.game.gameOver = true;
            complete.play();
        }

        //Bullet fire
        if(this.canFireBullet && this.isBulletFired){
            let speed;
            let bulletX;
            if(input.includes("ArrowLeft") || this.lastKey.includes("ArrowLeft")){
                speed = -BULLET_SPEED;
                bulletX = this.x;
            }else{
                speed = BULLET_SPEED;
                bulletX = this.x + this.width;
            }
                
            let bullet = new Bullet(this.level, this.spritesheets.enemies, bulletX, this.y + this.height/3, BULLET_WIDTH, BULLET_HEIGHT, speed);

            this.level.bullets.push(bullet);
            this.isBulletFired = false;
        }

        //Power state and size
        if(this.marioPowerState === "small"){
            this.width = SMALL_MARIO_WIDTH;
            this.height = SMALL_MARIO_HEIGHT;
        }else if(this.marioPowerState === "medium"){
            this.width = MEDIUM_MARIO_WIDTH;
            this.height = MEDIUM_MARIO_HEIGHT;
        }else if(this.marioPowerState === "large"){
            this.width = LARGE_MARIO_WIDTH;
            this.height = LARGE_MARIO_HEIGHT;
        }

    }
    
    //Draw
    draw(ctx){
        if(this.visible){
            ctx.drawImage(this.image.image, this.image.sx, this.image.sy, this.image.sw, this.image.sh, this.x, this.y, this.width, this.height);
        }
        if (this.brickParticle) {
            this.brickParticle.draw(this.ctx);
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

                        if(this.marioPowerState === "medium" || this.marioPowerState === "large"){
                            //Break the brick
                            this.level.nature.splice(this.level.nature.indexOf(item), 1);
                            this.brickParticle = new ParticleSystem(this.spritesheets.tiles, item.x, item.y - 8, 4);
                        }
                    }

                }
            }

        })

        //Enemies
        this.level.enemies.forEach( item => {
            if(collisionDetection(item, this)){
                
                //collision with Goomba and Koopa
                if( (item.type === "goomba" || item.type === "koopa" || item.type === "snail" || item.type ==="duck") && item.isDead === false){
                    //Left collision
                    if( this.x < item.x && this.vy <= 0){
                        if(this.marioPowerState === "small"){
                            this.isDead = true;
                        }else if(this.marioPowerState === "medium"){
                            item.vx = 0;
                            item.x = item.x + item.width/2;
                            powerDown.play();
                            
                            //Mario blinking during power increase
                            let blinkInterval = setInterval(() => {
                                this.visible = !this.visible;
                                }, 50);
            
                            // After blinkDuration, make Mario completely visible
                            setTimeout(() => {
                                this.marioPowerState = "small";
                                this.visible = true;
                                if(item.type === "goomba"){
                                    item.vx = GOOMBA_SPEED;
                                }else if(item.type === "koopa"){
                                    item.vx = KOOPA_SPEED;
                                }else if(item.type === "snail"){
                                    item.vx = SNAIL_SPEED;
                                }else if(item.type === "duck"){
                                    item.vx = DUCK_SPEED;
                                }
                                clearInterval(blinkInterval);
                            }, 1500)
                            
                        }else if(this.marioPowerState === "large"){
                            item.vx = 0;
                            item.x = item.x + item.width/2;
                            powerDown.play();
                            
                            //Mario blinking during power increase
                            let blinkInterval = setInterval(() => {
                                this.visible = !this.visible;
                                }, 50);
            
                            // After blinkDuration, make Mario completely visible
                            setTimeout(() => {
                                this.marioPowerState = "medium";
                                this.visible = true;
                                if(item.type === "goomba"){
                                    item.vx = GOOMBA_SPEED;
                                }else if(item.type === "koopa"){
                                    item.vx = KOOPA_SPEED;
                                }else if(item.type === "snail"){
                                    item.vx = SNAIL_SPEED;
                                }else if(item.type === "duck"){
                                    item.vx = DUCK_SPEED;
                                }
                                clearInterval(blinkInterval);
                            }, 1500);
                            
                        }
                       
                    }
                    //Right collision
                    if( this.x > item.x && this.vy <= 0){
                        if(this.marioPowerState === "small"){
                            this.isDead = true;
                        }else if(this.marioPowerState === "medium"){
                            item.vx = 0;
                            item.x = item.x - item.width/2;
                            powerDown.play();
                            
                            //Mario blinking during power increase
                            let blinkInterval = setInterval(() => {
                                this.visible = !this.visible;
                                }, 50);
            
                            // After blinkDuration, make Mario completely visible
                            setTimeout(() => {
                                this.marioPowerState = "small";
                                this.visible = true;
                                if(item.type === "goomba"){
                                    item.vx = GOOMBA_SPEED;
                                }else if(item.type === "koopa"){
                                    item.vx = KOOPA_SPEED;
                                }else if(item.type === "snail"){
                                    item.vx = SNAIL_SPEED;
                                }else if(item.type === "duck"){
                                    item.vx = DUCK_SPEED;
                                }
                                clearInterval(blinkInterval);
                            }, 1500);
                                
                        }else if(this.marioPowerState === "large"){
                            item.vx = 0;
                            item.x = item.x - item.width/2;
                            powerDown.play();
                            
                            //Mario blinking during power increase
                            let blinkInterval = setInterval(() => {
                                this.visible = !this.visible;
                                }, 50);
            
                            // After blinkDuration, make Mario completely visible
                            setTimeout(() => {
                                this.marioPowerState = "medium";
                                this.visible = true;
                                if(item.type === "goomba"){
                                    item.vx = GOOMBA_SPEED;
                                }else if(item.type === "koopa"){
                                    item.vx = KOOPA_SPEED;
                                }else if(item.type === "snail"){
                                    item.vx = SNAIL_SPEED;
                                }else if(item.type === "duck"){
                                    item.vx = DUCK_SPEED;
                                }
                                clearInterval(blinkInterval);
                            }, 1500);
                            
                        }
                    }
                    //Top collision
                    if(this.y < item.y && this.x + this.width > item.x && item.x + item.width > this.x && this.vy > 0){
                        item.isDead = true;
                        item.vx = 0;
                        //this.score = this.score + 10;
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
                    //this.score = this.score + 10;
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
                            let random = getRandomNumber(1, 3);
                            jump.currentTime = 0;
                            jump.play();

                            if(this.marioPowerState === "large"){
                                if(random === 1){
                                    item.generateFlower();
                                }else if(random === 2){
                                    item.generateMushroom();
                                }else{
                                    item.generateCoin();
                                }
                            }else if(this.marioPowerState === "medium"){
                                if(random === 1){
                                    item.generateFlower();
                                }else if(random === 2){
                                    item.generateMushroom();
                                }else{
                                    item.generateCoin();
                                }
                            }else{
                                if(random === 1){
                                    item.generateCoin();
                                }else{
                                    item.generateMushroom();
                                }
                            }
                        }
                    }
                }

                //Collision with mushroom and flower
                if(item.type === "mushroom" || item.type === "flower"){
                    if(item.type === "mushroom"){
                        this.marioPowerState = "medium";
                        this.noOfMushroomConsumed++;
                    } else{
                        this.marioPowerState = "large";
                        this.noOfFlowerConsumed++;
                        this.canFireBullet = true;
                    }
                    
                    //Mario blinking during power increase
                    let blinkInterval = setInterval(() => {
                        this.visible = !this.visible;
                    }, 50);
        
                    // After blinkDuration, make Mario completely visible
                    setTimeout(() => {
                        this.visible = true;
                        clearInterval(blinkInterval);
                    }, 1500);
        
                    item.isConsumed = true;
                    //this.score = this.score + 25;
                    mushroom.currentTime = 0;
                    mushroom.play();
                }
            }
        })

    }

    // //Check power up and play sound
    // checkPowerUp(score) {
    //     if (this.powerUpOccurred[score] === false) {
    //         powerUp.play();
    //         this.powerUpOccurred[score] = true;

    //         //Mario blinking during power increase
    //         let blinkInterval = setInterval(() => {
    //             this.visible = !this.visible;
    //         }, 50);
        
    //         // After blinkDuration, make Mario completely visible
    //         setTimeout(() => {
    //             this.visible = true;
    //             clearInterval(blinkInterval);
    //         }, 1500);
    //     }
    // }
    // //Check score 
    // checkScore() {
    //     if (this.score >= 50) {
    //         this.width = 20;
    //         this.height = 20;
    //         this.checkPowerUp(50);
    //     }
    //     if (this.score >= 100) {
    //         this.checkPowerUp(100);
    //     }
    //     if (this.score >= 200) {
    //         this.checkPowerUp(200);
    //     }
    // }
}