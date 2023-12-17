

class Koopa extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 89, 90, 16, 25);
        super(image, "koopa", x, y, width, height);
        this.level = level;
        this.vy = 0;
        this.vx = KOOPA_SPEED;
        this.gravity = GRAVITY;
        this.spritesheet = spritesheet;
        this.direction = "left";
        this.onGround = true;
        this.isDead = false;
        this.throwingHammer = false;

        //sprites
        this.stateObject = {
            movingLeft : {frames : [new Sprite(this.spritesheet, 119, 89, 17, 25),
                                    new Sprite(this.spritesheet, 149, 89, 17, 25)],
                        count : 0},
            hammerLeft : new Sprite(this.spritesheet, 89, 89, 16, 25),
        
            movingRight : {frames : [new Sprite(this.spritesheet, 179, 89, 17, 25),
                                    new Sprite(this.spritesheet, 209, 89, 17, 25)],
                        count : 0},
            hammerRight : new Sprite(this.spritesheet, 239, 89, 16, 25),

            dead : new Sprite(this.spritesheet, 359, 4, 17, 15),
        };
    }

    update(animateFrame, mario){

        //call for collision check
        this.checkCollision();

        if(this.x - mario.x <= 270){
            this.vx = KOOPA_SPEED;

            //horizontal motion
            if(!this.isDead){
                if(this.direction === "left"){
                    this.x -= this.vx;
                    if(animateFrame % 8 === 0){
                        if(!this.throwingHammer){
                            this.sprite = this.stateObject.movingLeft.frames[this.stateObject.movingLeft.count]
                            this.stateObject.movingLeft.count++;
                            if(this.stateObject.movingLeft.count > 1){
                                this.stateObject.movingLeft.count = 0;
                            }
                        }else if(this.throwingHammer){
                            this.sprite = this.stateObject.hammerLeft;
                        }
                    }
                }else if(this.direction === "right"){
                    this.x += this.vx;
                    if(animateFrame % 8 ===0){
                        if(!this.throwingHammer){
                            this.sprite = this.stateObject.movingRight.frames[this.stateObject.movingRight.count]
                            this.stateObject.movingRight.count++;
                            if(this.stateObject.movingRight.count > 1){
                                this.stateObject.movingRight.count = 0;
                            }
                        }else if(this.throwingHammer){
                            this.sprite = this.stateObject.hammerRight;
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
                this.vy = KOOPA_VERTICAL_VELOCITY;
                this.vy -= this.gravity;
            }
        }else{
        this.vx = 0;
        }

        if (this.x - mario.x <= 200 && !this.isDead && animateFrame% 12 === 0) {
            if (this.throwingHammer) {
                let speed;
                let hammerX;
                if(this.direction === "left"){
                    speed = -HAMMER_SPEED;
                    hammerX = this.x;
                }else{
                    speed = HAMMER_SPEED;
                    hammerX = this.x + this.width;
                }
                
                if((mario.x < this.x && this.direction === "left") || (mario.x > this.x && this.direction ==="right")){
                    let hammer = new Hammer(this.level, this.spritesheet, hammerX, this.y, HAMMER_WIDTH, HAMMER_HEIGHT, speed);

                    this.level.hammers.push(hammer);
                    console.log(this.level.hammers);
                }
                this.throwingHammer = false;
                
            } else {
                // Set a timer to make Koopa throw a hammer at regular intervals
                setTimeout(() => {
                    this.throwingHammer = true;
                    if(this.level.hammers.length === 10){
                        this.level.hammers = [];
                    }
                }, 800);
            }
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    //function to check collision
    checkCollision(){

        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){
                //Collision with ground
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
                    if(this.x < item.x ){
                        this.x = item.x - this.width;
                        this.direction = "left"; 
                    }
                    //right
                    if(this.x > item.x){
                        this.x = item.x + item.width;
                        this.direction = "right";
                    }
                } 

            }
        })
    }
}