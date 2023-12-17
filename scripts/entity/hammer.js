


class Hammer extends Entity{
    constructor(level,spritesheet, x, y, width, height, speed){
        let image = new Sprite(spritesheet, 264, 100, 8, 12);
        super(image, "hammer", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.speed = speed;
        this.gravity = GRAVITY;
        this.vy = -VERTICAL_HAMMER_VELOCITY;
        // this.isConsumed = false;

        console.log(this.spritesheet);
        //sprites
        this.stateObject = {
            hammer : {frames : [new Sprite(this.spritesheet, 264, 100, 8, 12),
                                new Sprite(this.spritesheet, 284, 87, 8, 16),
                                new Sprite(this.spritesheet, 263, 87, 15, 8),
                                new Sprite(this.spritesheet, 285, 108, 6, 4)],
                        count : 0},
        };
    }

    update(animateFrame){

        //call for collision check
        // this.checkCollision();

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

        // //Removes mushroom if it is consumed
        // if(this.isConsumed){
        //     this.level.rewards.splice(this.level.rewards.indexOf(this), 1);
        // }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    // checkCollision(){
    //     this.level.nature.forEach( item => {
    //         if(collisionDetection(item, this)){

    //             //Collision with grounds
    //             if(item.type === "ground"){
    //                 console.log("ground");
    //                 if(this.y < item.y && this.vy >= 0){
    //                     this.y = item.y - this.height;
    //                     this.vy = -VERTICAL_BULLET_VELOCITY;
    //                 }
    //             }

    //             //Collision with pipes, stairs and bricks
    //             if(item.type === "pipe" || item.type === "stair" || item.type === "brick"){
    //                 this.width = COLLISION_BULLET_WIDTH;
    //                 this.height = COLLISION_BULLET_HEIGHT;
    //                 setTimeout(()=> {
    //                     this.level.bullets.splice(this.level.bullets.indexOf(this), 1);
    //                 }, 100);
    //             }

    //             //Collision with enemies
    //         }

    //     })
    // }
}