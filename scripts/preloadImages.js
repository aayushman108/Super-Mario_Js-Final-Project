
/**
 * Preloads images and returns a Promise that resolves to an array of Image objects.
 * @param {Array} imagePaths - An array of image paths to preload.
 * @returns {Promise<Array<Image>>} - A Promise that resolves to an array of Image objects.
 */
function preloadImages(imagePaths) {
    const promises = [];
    for (const path of imagePaths) {
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
        promises.push(promise);
    }
    return Promise.all(promises);
}

// Array of image paths to preload
const imagePaths = ["assets/images/marioLeft.png", "assets/images/marioRight.png", "assets/images/tiles.png", "assets/images/enemies.png", "assets/images/items.png", "assets/images/castle.png"];

// Preload images before starting the game
preloadImages(imagePaths)
    .then((images) => {
        const imageObj = {
            marioLeft : images[0],
            marioRight : images[1],
            tiles : images[2],
            enemies : images[3],
            items : images[4],
            castle : images[5],
        }

        //start game
        startGame(imageObj);
    })
    .catch((error) => {
        alert("Error loading images...")
    });