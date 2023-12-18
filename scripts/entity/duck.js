

class Duck extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 149, 0, 17, 24);
        super(image, "duck", x, y, width, height);
        this.level = level;
        this.vy = 0;
        this.vx = DUCK_SPEED;
        this.gravity = GRAVITY;
        this.spritesheet = spritesheet;
        this.direction = "left";
        this.onGround = true;
        this.isDead = false;
        this.bulletConsumed = 0;

        //sprites
        this.stateObject = {
            movingLeft : {frames : [new Sprite(this.spritesheet, 149, 0, 17, 24),
                                    new Sprite(this.spritesheet, 180, 0, 16, 24)],
                        count : 0},
            flyingLeft : {frames : [new Sprite(this.spritesheet, 89, 0, 17, 24),
                                    new Sprite(this.spritesheet, 119, 0, 17, 23)],
                        count : 0},
        
            movingRight : {frames : [new Sprite(this.spritesheet, 210, 0, 16, 23),
                                    new Sprite(this.spritesheet, 239, 0, 17, 24)],
                        count : 0},
            flyingRight : {frames : [new Sprite(this.spritesheet, 270, 0, 16, 23),
                                    new Sprite(this.spritesheet, 300, 0, 16, 24)],
            count : 0},

            dead : new Sprite(this.spritesheet, 356, 4, 19, 15),
        };
    }

    update(animateFrame, mario){

        //call for collision check
        this.checkCollision();

        if(this.x - mario.x <= 270){
            this.vx = DUCK_SPEED;
            //horizontal motion
            if(!this.isDead){
                if(this.direction === "left"){
                    this.x -= this.vx;
                    if(animateFrame % 8 === 0){
                        if(this.onGround){
                            this.sprite = this.stateObject.movingLeft.frames[this.stateObject.movingLeft.count]
                            this.stateObject.movingLeft.count++;
                            if(this.stateObject.movingLeft.count > 1){
                                this.stateObject.movingLeft.count = 0;
                            }
                        }else if(!this.onGround){
                            this.sprite = this.stateObject.flyingLeft.frames[this.stateObject.flyingLeft.count]
                            this.stateObject.flyingLeft.count++;
                            if(this.stateObject.flyingLeft.count > 1){
                                this.stateObject.flyingLeft.count = 0;
                            }
                        }
                    }
                }else{
                    this.x += this.vx;
                    if(animateFrame % 8 ===0){
                        if(this.onGround){
                            this.sprite = this.stateObject.movingRight.frames[this.stateObject.movingRight.count]
                            this.stateObject.movingRight.count++;
                            if(this.stateObject.movingRight.count > 1){
                                this.stateObject.movingRight.count = 0;
                            }
                        }else if(!this.onGround){
                            this.sprite = this.stateObject.flyingRight.frames[this.stateObject.flyingRight.count]
                            this.stateObject.flyingRight.count++;
                            if(this.stateObject.flyingRight.count > 1){
                                this.stateObject.flyingRight.count = 0;
                            }
                        }
                    }
                }
            }else{
                this.sprite = this.stateObject.dead;
            }

            //vertical motion
            this.y += this.vy;
            if(this.onGround){
                this.vy = 0;
                this.onGround = false;
            }else{
                this.vy = DUCK_VERTICAL_VELOCITY;
                this.vy -= this.gravity;
            }

        }else{
            this.vx = 0;
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    //function to check collision
    checkCollision(){

        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){
                //Collision with ground and bricks
                if(item.type === "ground" || item.type === "brick"){
                    if(this.y < item.y && this.vy >=0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.onGround = true;
                    }
                }

                //Collision with pipes and stairs
                if(item.type === "pipe" || item.type === "stair"){
                    //left
                    if(this.x < item.x && this.y >= item.y){
                        this.x = item.x - this.width;
                        this.direction = "left"; 
                    }
                    //right
                    if(this.x > item.x && this.y >= item.y){
                        this.x = item.x + item.width;
                        this.direction = "right";
                    }
                    //top
                    if(this.y < item.y && this.vy >=0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.onGround = true;
                    }
                } 
            }
        })

        this.level.rewards.forEach(item => {
            if(collisionDetection(item, this)){
                //Collision with mystery box
                if(item.type === "mystery box"){
                    if(this.y < item.y && this.vy >=0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.onGround = true;
                    }
                }
            }
        })
    }
}