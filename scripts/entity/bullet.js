


class Bullet extends Entity{
    constructor(level,spritesheet, x, y, width, height, speed, mario){
        let image = new Sprite(spritesheet, 363, 187, 10, 9);
        super(image, "bullet", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.mario = mario;
        this.speed = speed;
        this.gravity = GRAVITY;
        this.vy = -VERTICAL_BULLET_VELOCITY;
    }

    update(ctx){

        //call for collision check
        this.checkCollision();
        this.x += this.speed;

        this.y += this.vy;
        this.vy += this.gravity;

    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    checkCollision(){
        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){

                //Collision with grounds
                if(item.type === "ground"){
                    if(this.y < item.y && this.vy >= 0){
                        this.y = item.y - this.height;
                        this.vy = -VERTICAL_BULLET_VELOCITY;
                    }
                }

                //Collision with pipes, stairs and bricks
                if(item.type === "pipe" || item.type === "stair" || item.type === "brick"){
                    this.width = COLLISION_BULLET_WIDTH;
                    this.height = COLLISION_BULLET_HEIGHT;
                    setTimeout(()=> {
                        this.level.bullets.splice(this.level.bullets.indexOf(this), 1);
                    }, 100);
                }
            }

        })

        this.level.enemies.forEach(item => {
            if(collisionDetection(item, this)){
                this.level.bullets.splice(this.level.bullets.indexOf(this), 1);
                item.bulletConsumed++;
                if(item.bulletConsumed >=3){
                    this.width = COLLISION_BULLET_WIDTH;
                    this.height = COLLISION_BULLET_HEIGHT;
                    item.isDead = true;
                    killEnemy.currentTime = 0;
                    killEnemy.play();
                    this.mario.score +=200;
                }
            }
        })
    }
}