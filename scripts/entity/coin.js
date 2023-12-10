
class Coin extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 2, 98, 10, 15);
        super(image, "coin", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.removeCoin = false;

        this.stateObject = {
            frames : [new Sprite(this.spritesheet, 2, 98, 10, 15),
                new Sprite(this.spritesheet, 20, 113, 8, 15), 
                new Sprite(this.spritesheet, 5, 113, 5, 15),],
            count : 0,
        };
    }

    update(animateFrame){
        if(animateFrame % 10 === 0){
            this.sprite = this.stateObject.frames[this.stateObject.count]
            this.stateObject.count++;
            if(this.stateObject.count > 2){
                this.stateObject.count = 0;
            }
        }

        if(this.removeCoin){
            this.level.rewards.splice(this.level.rewards.indexOf(this), 1);
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}