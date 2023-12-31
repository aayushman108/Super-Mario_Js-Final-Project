
class Coin extends Entity{
    constructor(level, spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 2, 98, 10, 15);
        super(image, "coin", x, y, width, height);
        this.spritesheet = spritesheet;
        this.level = level;
        this.removeCoin = false;

        //sprites
        this.stateObject = {
            frames : [new Sprite(this.spritesheet, 2, 98, 10, 15),
                new Sprite(this.spritesheet, 20, 113, 8, 15), 
                new Sprite(this.spritesheet, 5, 113, 5, 15),],
            count : 0,
        };
    }

    /**
     * This method updates the coin state in the canvas
     * @param {number} animateFrame - The animation step.
     */
    update(animateFrame){

        if(animateFrame % 10 === 0){
            this.sprite = this.stateObject.frames[this.stateObject.count]
            this.stateObject.count++;
            if(this.stateObject.count > 2){
                this.stateObject.count = 0;
            }
        }

        //Removes coin if it is consumed
        if(this.removeCoin){
            this.level.rewards.splice(this.level.rewards.indexOf(this), 1);
        }
    }

    /**
     * This method draws the coins in the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}