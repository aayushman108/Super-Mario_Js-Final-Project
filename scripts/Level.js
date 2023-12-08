
class Level{
    constructor(level, images){
        this.nature = [];

        //Ground........................................
        level.ground.forEach((cord) => {
            this.nature.push(
              new Ground(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Grasses.........................................
        level.grasses.forEach((cord) => {
            this.nature.push(
              new Grasses(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Small clouds......................................
        level.smallClouds.forEach((cord) => {
            this.nature.push(
              new SmallCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Large clouds...................................................
        level.largeClouds.forEach((cord) => {
            this.nature.push(
              new SmallCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Bricks...........................................................
        level.bricks.forEach((cord) => {
            this.nature.push(
              new Brick(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Pipes..........................................................
        level.pipes.forEach((cord) => {
            this.nature.push(
              new Pipe(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Stairs.........................................................
        level.stairs.forEach((cord) => {
            this.nature.push(
              new Stair(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        // //Flag
        // level.largeClouds.forEach((cord) => {
        //     this.nature.push(
        //       new LargeCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
        //     )
        // })

        // //Flag pole
        // level.largeClouds.forEach((cord) => {
        //     this.nature.push(
        //       new LargeCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
        //     )
        // })

        // //Castle
        // level.largeClouds.forEach((cord) => {
        //     this.nature.push(
        //       new LargeCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
        //     )
        // })


    }

    draw(ctx){
        this.nature.forEach(item => item.draw(ctx));
    }
}