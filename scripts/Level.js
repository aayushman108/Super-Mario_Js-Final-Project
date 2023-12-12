
class Level{
    constructor(level, images){
        this.nature = [];
        this.enemies = [];
        this.rewards = [];

        //Ground.........................
        level.ground.forEach((cord) => {
            this.nature.push(
              new Ground(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Grasses.........................
        level.grasses.forEach((cord) => {
            this.nature.push(
              new Grasses(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Small clouds........................
        level.smallClouds.forEach((cord) => {
            this.nature.push(
              new SmallCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Large clouds.......................
        level.largeClouds.forEach((cord) => {
            this.nature.push(
              new SmallCloud(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Bricks.........................
        level.bricks.forEach((cord) => {
            this.nature.push(
              new Brick(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Pipes.........................
        level.pipes.forEach((cord) => {
            this.nature.push(
              new Pipe(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Stairs.........................
        level.stairs.forEach((cord) => {
            this.nature.push(
              new Stair(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Coins.........................
        level.coins.forEach((cord) => {
          this.rewards.push(
            new Coin(this, images.items, cord[0], cord[1], cord[2], cord[3])
          )
        })

        //Mystery box.........................
        level.mysteryBoxes.forEach((cord) => {
          this.rewards.push(
            new MysteryBox(this, images.tiles, images, cord[0], cord[1], cord[2], cord[3])
          )
        })

        // //Flag.........................
        // level.flag.forEach((cord) => {
        //     this.nature.push(
        //       new Flag(images.items, cord[0], cord[1], cord[2], cord[3])
        //     )
        // })

        //Flag pole.......................
        level.flagpole.forEach((cord) => {
            this.nature.push(
              new Flagpole(images.tiles, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Castle........................
        level.castle.forEach((cord) => {
            this.nature.push(
              new Castle(images.castle, cord[0], cord[1], cord[2], cord[3])
            )
        })

        //Goomba..........................
        level.goombas.forEach((cord) => {
          this.enemies.push(
            new Goomba(this, images.enemies, cord[0], cord[1], cord[2], cord[3])
          )
        })

        //Koopa..........................
        level.koopas.forEach((cord) => {
          this.enemies.push(
            new Koopa(this, images.enemies, cord[0], cord[1], cord[2], cord[3])
          )
        })


    }

    update(animateFrame){
      this.enemies.forEach(item => {
        if(item.type === "goomba" || item.type === "koopa"){
          item.update(animateFrame);
        }
      })
      this.rewards.forEach(item => {
        if(item.type === "coin" || item.type === "mystery box" || item.type === "mushroom"){
          item.update(animateFrame);
        }
      })
    }

    draw(ctx){
        this.nature.forEach(item => item.draw(ctx));
        this.enemies.forEach(item => item.draw(ctx));
        this.rewards.forEach(item => item.draw(ctx));
    }
}