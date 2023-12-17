
class Goomba extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 3, 16, 16);
        super(image, "goomba", x, y, width, height);
        this.level = level;
        this.vy = 0;
        this.vx = GOOMBA_SPEED;
        this.spritesheet = spritesheet;
        this.direction = "left";
        this.onGround = true;
        this.isDead = false;

        //sprites
        this.stateObject = {
            movingLeft : new Sprite(this.spritesheet, 0, 3, 16, 16),
        
            movingRight : new Sprite(this.spritesheet, 29, 3, 17, 16),

            goombaDead : new Sprite(this.spritesheet, 59, 7, 17, 9),

        };
    }

    update(animateFrame, mario){

        //Call for collision check
        this.checkCollision();

        if(this.x - mario.x <= 270){
            this.vx = GOOMBA_SPEED;
            //horizontal motion
            if(!this.isDead){
                if(this.direction === "left"){
                    this.x -= this.vx;
                    this.sprite = this.stateObject.movingRight;
                }else{
                    this.x += this.vx;
                    this.sprite = this.stateObject.movingLeft;
                }
            }else{
                this.sprite = this.stateObject.goombaDead;
            }

            //vertical motion
            this.y += this.vy;
            if(this.onGround){
                this.vy = 0;
                this.onGround = false;
            }else{
                this.vy = GOOMBA_VERTICAL_VELOCITY;
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
                //Collision with ground
                if(item.type === "ground"){
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
                } 

            }
        })
    }
}