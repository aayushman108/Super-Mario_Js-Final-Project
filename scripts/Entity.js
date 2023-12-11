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

//Ground........................................................................
class Ground extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 0, 16, 16);
        super(image, "ground", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Grasses...........................................................................
class Grasses extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 184, 144, 32, 16);
        super(image, "grasses", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Large Cloud............................................................................
class LargeCloud extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 127, 353, 50, 16);
        super(image, "large cloud", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Small Cloud...............................................................................
class SmallCloud extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 7, 350, 34, 25);
        super(image, "small cloud", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Brick.....................................
class Brick extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 15, 0, 15, 15);
        super(image, "brick", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Pipe............................
class Pipe extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 160, 32, 32);
        super(image, "pipe", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Stair.........................
class Stair extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 15, 15, 15);
        super(image, "stair", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

// //Flag
// class Flag extends Entity{
//     constructor(spritesheet, x, y, width, height){
//         let image = new Sprite(spritesheet, 127, 32, 17, 16);
//         super(image, "flag", x, y, width, height);
//     }

//     draw(ctx){
//         ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
//     }
// }

//Flag pole
class Flagpole extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 260, 136, 8, 24);
        super(image, "flag pole", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

//Castle
class Castle extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 0, 0, 80, 80);
        super(image, "castle", x, y, width, height);
    }

    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}
