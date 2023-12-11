

class MysteryBox extends Entity{
    constructor(level, spritesheet, images, x, y, width, height){
        let image = new Sprite(spritesheet, 384, 0, 16, 15);
        super(image, "mystery box", x, y, width, height);
        this.level = level;
        this.images = images;
        this.emptyBox = false;
        this.collisionCount = 0;

        this.stateObject = {
            filledBox : new Sprite(spritesheet, 384, 0, 16, 15),
            emptyBox : new Sprite(spritesheet, 432, 0, 16, 15),
        }
    }

    update(){
        if(this.emptyBox){
            //change sprite
            this.sprite = this.stateObject.emptyBox;
        }
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }

    generateMushroom(){
        let mushroom = new Mushroom(this.level, this.images.items, this.x, this.y - 16, 16, 16);
        this.level.mushrooms.push(mushroom);
    }
}