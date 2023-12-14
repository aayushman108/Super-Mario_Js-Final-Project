class Particle extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 15, 0, 7.5, 7.5);
        super(image, "particle", x, y, width, height);
        this.vx = findRandomNumber(-1, 1);
        this.vy = findRandomNumber(-6, -4);
        this.gravity = 0.5;
    }

    update(){
        //horizontzal motion
        this.x += this.vx;

        //vertical motion
        this.y += this.vy;
        this.vy += this.gravity;
    }

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
            console.log(this.noOfParticles);
            this.particles.push(new Particle(this.sprite, this.x, this.y, 8, 8));

        }
    }

    update(){
        this.particles.forEach(item => item.update())
        setTimeout( ()=> {
            this.particles = [];
        }, 500);
    }

    draw(ctx){
        this.particles.forEach(item => item.draw(ctx));
    }
}
