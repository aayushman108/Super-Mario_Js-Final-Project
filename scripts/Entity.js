class Entity{
    constructor(sprite, type, x, y, width, height){
        this.sprite = sprite;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Ground extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 0, 16, 16);
        super(image, "ground", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}