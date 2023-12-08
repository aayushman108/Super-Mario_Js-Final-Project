
class Level{
    constructor(level, images){
        this.nature = [];

        console.log(images.tiles);
        console.log(level.ground);


        level.ground.forEach((cord) => {
            this.nature.push(
              new Ground(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })
    }

    draw(ctx){
        this.nature.forEach(item => item.draw(ctx));
    }
}