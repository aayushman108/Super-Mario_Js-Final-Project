

class MysteryBox extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 384, 0, 16, 15);
        super(image, "mystery box", x, y, width, height);
        this.level = level;
        this.emptyBox = false;

        this.stateObject = {
            filledBox : new Sprite(spritesheet, 384, 0, 16, 15),
            emptyBox : new Sprite(spritesheet, 432, 0, 16, 15),
        }
    }

    update(animateFrame){
        if(this.emptyBox){
            this.sprite = this.stateObject.emptyBox;
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}