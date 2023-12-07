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
const imagePaths = ["../assets/marioLeft.png", "../assets/marioRight.png"];

// Preload images before starting the game
preloadImages(imagePaths)
    .then((images) => {
        startGame(images);
    })
    .catch((error) => {
        alert("Error loading images...")
    });