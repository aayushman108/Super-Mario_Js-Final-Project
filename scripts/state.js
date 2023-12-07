const state = {
    standingLeft : new Sprite(images[0], 80, 32, 15, 16),

    standingRight : new Sprite(images[1], 80, 32, 15, 16),

    runningLeft : [ new Sprite(images[0], 96, 32, 15, 16),
                    new Sprite(images[0], 113, 32, 15, 16),
                    new Sprite(images[0], 128, 32, 15, 16)],

    runningRight : [ new Sprite(images[1], 96, 32, 15, 16),
                     new Sprite(images[1], 113, 32, 15, 16),
                     new Sprite(images[1], 128, 32, 15, 16)]
}