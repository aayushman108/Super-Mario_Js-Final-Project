

class Mushroom extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 16, 0, 16, 16);
        super(image, "mushroom", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.speed = 1;
        this.isConsumed = false;
        this.vy = -5;
        this.gravity = 0.5;
        this.direction = "right";
    }

    update(ctx){

        //call for collision check
        this.checkCollision();

        //horizontal
        if(this.direction === "left"){
            this.x -= this.speed;
        }else if(this.direction === "right"){
            this.x += this.speed;
        }

        //vertical
        this.y += this.vy;
        this.vy += this.gravity;
        
        //Removes mushroom if it is consumed
        if(this.isConsumed){
            this.level.rewards.splice(this.level.rewards.indexOf(this), 1);
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

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