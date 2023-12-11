

class Mushroom extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 16, 0, 16, 16);
        super(image, "mushroom", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.speed = 1;
        this.isConsumed = false;
    }

    update(ctx){
        this.x += this.speed;
        if(this.isConsumed){
            this.level.mushrooms.splice(this.level.mushrooms.indexOf(this), 1);
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}