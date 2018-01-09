/**
 * Create a script asynchronously.
 *
 * @public
 * @since 1.0
 *
 * @param {string} src - file location
 * @param {boolean} async - load file asynchronously
 *
 * @returns {Promise}
 */
function addScript(src, async = false) {
  return new Promise((resolve, reject) => {
    let id = uuid();
    let script = document.createElement('script');

    script.id = id;
    script.src = src;
    script.async = async;

    if (!document.getElementById(id)) {
      document.getElementsByTagName('head')[0].appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    }
  });
}

/**
 * Generates a unique identifier.
 *
 * @public
 * @since 1.0
 *
 * @returns {string}
 */
function uuid() {
  return uniqueID(randomNumber());
}

/**
 * Generates random number with 6 digits.
 *
 * @returns {number}
 */
function randomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

/**
 * Creates a prefixed identifier.
 *
 * @param {number} number
 * @param {string} prefix
 *
 * @returns {string}
 */
function uniqueID(number, prefix = 'gears-') {
  return prefix + number;
}

// declare exported functions
export { uuid, addScript };
