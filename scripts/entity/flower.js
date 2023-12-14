


class Flower extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 48, 31, 16, 17);
        super(image, "flower", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.isConsumed = false;
    }

    update(ctx){
        
        //Removes mushroom if it is consumed
        if(this.isConsumed){
            this.level.rewards.splice(this.level.rewards.indexOf(this), 1);
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    
}