

class Mushroom extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 16, 0, 16, 16);
        super(image, "mushroom", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.vx = MUSHROOM_SPEED;
        this.isConsumed = false;
        this.vy = -MUSHROOM_VERTICAL_VELOCITY;
        this.gravity = GRAVITY;
        this.direction = "right";
    }

    /** This method updates the mushroom state */
    update(){

        //call for collision check
        this.checkCollision();

        //horizontal
        if(this.direction === "left"){
            this.x -= this.vx;
        }else if(this.direction === "right"){
            this.x += this.vx;
        }

        //vertical
        this.y += this.vy;
        this.vy += this.gravity;
        
        //Removes mushroom if it is consumed
        if(this.isConsumed){
            this.level.rewards.splice(this.level.rewards.indexOf(this), 1);
        }
    }

    /**
     * This method draws the mushroom in the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    /** This method checks the collision between mushroom and other entities including Mario */
    checkCollision(){
        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Collision with grounds
                if(item.type === "brick" || item.type === "ground"){
                    if(this.y < item.y && this.vy >=0){
                        this.y = item.y - this.height;
                        this.vy = 0;
                    }
                }
                if(item.type === "pipe" || item.type === "stair"){
                    if(this.x < item.x){
                        this.x = item.x - this.width;
                        this.direction = "left";
                    }else if(this.x > item.x){
                        this.x = item.x + item.width;
                        this.direction = "right";
                    }
                }
            }

        })
    }
}