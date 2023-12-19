


class Hammer extends Entity{
    constructor(level,spritesheet, x, y, width, height, speed, mario){
        let image = new Sprite(spritesheet, 264, 100, 8, 12);
        super(image, "hammer", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.speed = speed;
        this.gravity = GRAVITY;
        this.vy = -VERTICAL_HAMMER_VELOCITY;
        this.mario = mario;

        //sprites
        this.stateObject = {
            hammer : {frames : [new Sprite(this.spritesheet, 264, 100, 8, 12),
                                new Sprite(this.spritesheet, 284, 87, 8, 16),
                                new Sprite(this.spritesheet, 263, 87, 15, 8),
                                new Sprite(this.spritesheet, 285, 108, 6, 4)],
                        count : 0},
        };
    }

    /**
      * This method updates the duck postion and state.
      * @param {number} animateFrame - The animation step.
      */
    update(animateFrame){

        //call for collision check
        this.checkCollision();

        if(animateFrame % 8 === 0){
            this.sprite = this.stateObject.hammer.frames[this.stateObject.hammer.count]
            this.stateObject.hammer.count++;
            if(this.stateObject.hammer.count > 3){
                this.stateObject.hammer.count = 0;
            }
        }


        this.x += this.speed;

        this.y += this.vy;
        this.vy += this.gravity;

    }

    /**
     * This method draws the hammer in the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    /** This method checks the collision between hammer and other entities including Mario */
    checkCollision(){
        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Collision with pipes, stairs and bricks
                if(item.type === "pipe" || item.type === "stair" || item.type === "brick"){
                    setTimeout(()=> {
                        this.level.hammers.splice(this.level.bullets.indexOf(this), 1);
                    }, 20);
                }
            }

        })

        if(collisionDetection(this.mario, this)){
            this.level.hammers.splice(this.level.bullets.indexOf(this), 1);
            this.mario.score -= 100;
        }
    }
}