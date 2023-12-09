
class Goomba extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 3, 16, 16);
        super(image, "goomba", x, y, width, height);
        this.level = level;
        this.vy = 0.5;
        this.speed = 0.3;
        this.spritesheet = spritesheet;
        this.direction = "left";
        this.onGround = true;

        this.stateObject = {
            movingLeft : new Sprite(this.spritesheet, 0, 3, 16, 16),
        
            movingRight : new Sprite(this.spritesheet, 29, 3, 17, 16),

            dead : new Sprite(this.spritesheet, 59, 7, 17, 9),

        };
    }

    update(){
        this.checkCollision();

        //horizontal motion
        if(this.direction === "left"){
            this.x -= this.speed;
            this.sprite = this.stateObject.movingRight;
        }else{
            this.x += this.speed;
            this.sprite = this.stateObject.movingLeft;
        }

        //vertical motion
        this.y += this.vy;
        if(this.onGround){
            this.vy = 0;
            this.onGround = false;
        }else{
            this.vy = 5;
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    checkCollision(){

        this.level.nature.forEach( item => {
            if(collisionDetection(item, this)){
                //Ground collision
                if(item.type === "ground"){
                    if(this.y < item.y && this.vy >=0){
                        this.y = item.y - this.height + 0.5;
                        this.vy = 0;
                        this.onGround = true;
                    }
                }

                //Collision with pipe
                if(item.type === "pipe" || item.type === "stair"){
                    console.log("pipe collision")
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