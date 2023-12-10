//preloaded images

// Function to preload images
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
const imagePaths = ["../assets/marioLeft.png", "../assets/marioRight.png", "../assets/tiles.png", "../assets/enemies.png", "../assets/items.png"];

// Preload images before starting the game
preloadImages(imagePaths)
    .then((images) => {
        const imageObj = {
            marioLeft : images[0],
            marioRight : images[1],
            tiles : images[2],
            enemies : images[3],
            items : images[4],
        }
        startGame(imageObj);
    })
    .catch((error) => {
        alert("Error loading images...")
    });