


class Bullet extends Entity{
    constructor(level,spritesheet, x, y, width, height, speed){
        let image = new Sprite(spritesheet, 363, 187, 10, 9);
        super(image, "bullet", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.speed = speed;
        this.gravity = 0.5;
        this.vy = -4;
        // this.isConsumed = false;
    }

    update(ctx){

        //call for collision check
        this.checkCollision();
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

    checkCollision(){
        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Collision with grounds
                if(item.type === "ground"){
                    console.log("ground");
                    if(this.y < item.y && this.vy >= 0){
                        this.y = item.y - this.height;
                        this.vy = -4;
                    }
                }

                //Collision with pipes, stairs and bricks
                if(item.type === "pipe" || item.type === "stair" || item.type === "brick"){
                    this.height = 16;
                    this.width = 16;

                    setTimeout(()=> {
                        this.level.bullets.splice(this.level.bullets.indexOf(this), 1);
                    }, 100);
                }

                //Collision with enemies
            }

        })
    }
}