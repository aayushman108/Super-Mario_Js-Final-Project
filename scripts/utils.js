
/**
 * Detects collision between two objects.
 * @param {Object} a - The first object with properties x, y, width, and height.
 * @param {Object} b - The second object with properties x, y, width, and height.
 * @returns {boolean} - True if there is a collision, false otherwise.
 */
function collisionDetection(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
}

/**
 * Retrieves the value of a query parameter from the current URL.
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {?string} - The value of the specified query parameter, or null if the parameter is not present.
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} - A random integer between min and max.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random number between the specified minimum and maximum values.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - A random number between min (inclusive) and max (exclusive).
 */
function findRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}


//data for next levels from local storage
let savedData;
let savedData2;

/**
 * Retrieves data from local storage for the given key.
 * @param {string} key - The key to retrieve data from local storage.
 * @returns {Promise<any>} - A promise that resolves to the retrieved data.
 */
function getDataFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem(key);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// To get 'mapData' data
getDataFromLocalStorage('mapData')
  .then(savedDataString => {
    if (savedDataString) {
      savedData = JSON.parse(savedDataString);
    } else {
      alert('No data found in local storage.');
    }
  })
  .catch(error => {
    alert('Error fetching data:', error);
  });

  //To get 'map2Data' data
  getDataFromLocalStorage('map2Data')
  .then(savedDataString => {
    if (savedDataString) {
      savedData2 = JSON.parse(savedDataString);
    } else {
      alert('No data found in local storage.');
    }
  })
  .catch(error => {
    alert('Error fetching data:', error);
  });


  