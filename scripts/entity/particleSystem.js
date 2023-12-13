class Particle extends Entity{
    constructor(spritesheet, x, y, width, height){
        let image = new Sprite(spritesheet, 15, 0, 7.5, 7.5);
        super(image, "particle", x, y, width, height);
        // this.vx = 0.2;
        // this.vy = -0.1;
    }

    update(){
        //this.x += this.vx;
        console.log("update")
    }

    draw(ctx){
        console.log("hellow draw", this.sprite.image);

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

        for (let i = 0; i < noOfParticles; i++) {
            this.particles.push(new Particle(this.sprite, this.x, this.y, 8, 8));
        }
    }

    update(){
        this.particles.forEach(item => item.update())
        console.log(this.particles[0])
    }

    draw(ctx){
        console.log("draw")
        this.particles.forEach(item => item.draw(ctx));
    }
}
