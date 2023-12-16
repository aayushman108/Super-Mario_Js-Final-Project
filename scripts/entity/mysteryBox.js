

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

    //function to generate mushroom
    generateMushroom(){
        let mushroom = new Mushroom(this.level, this.images.items, this.x, this.y - MUSHROOM_HEIGHT, MUSHROOM_WIDTH, MUSHROOM_HEIGHT);
        this.level.rewards.push(mushroom);
    }

    //function to generate coin
    generateCoin(){
        let coin = new Coin(this.level, this.images.items, this.x, this.y - COIN_HEIGHT, COIN_WIDTH, COIN_HEIGHT);
        this.level.rewards.push(coin);
    }

    //function to generate flower
    generateFlower(){
        let flower = new Flower(this.level, this.images.items, this.x, this.y - FLOWER_HEIGHT, FLOWER_WIDTH, FLOWER_HEIGHT);
        this.level.rewards.push(flower);
    }
}