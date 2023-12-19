class Particle extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 15, 0, 7.5, 7.5);
        super(image, "particle", x, y, width, height);
        this.vx = findRandomNumber(-1, 1);
        this.vy = findRandomNumber(-6, -4);
        this.gravity = GRAVITY;
    }

    /** This method updates the brick particles state */
    update(){
        //horizontzal motion
        this.x += this.vx;

        //vertical motion
        this.y += this.vy;
        this.vy += this.gravity;
    }

    /**
     * This method draws the brick particles in the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.sprite.image, this.sprite.sx, this.sprite.sy, this.sprite.sw, this.sprite.sh, this.x, this.y, this.width, this.height);
    }
}

class ParticleSystem{
    constructor(spritesheet, x, y, noOfParticles){
        this.sprite = spritesheet;
        this.x = x;
        this.y = y;
        this.noOfParticles = noOfParticles;
        this.particles = [];

        for (let i = 0; i < this.noOfParticles; i++) {
            this.particles.push(new Particle(this.sprite, this.x, this.y, 8, 8));

        }
    }

    update(){
        this.particles.forEach(item => item.update())
        setTimeout( ()=> {
            this.particles = [];
        }, 500);
    }

    /**
     * This method calls draw() method of Particle class
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        this.particles.forEach(item => item.draw(ctx));
    }
}
