// makeHash.js

/**
 * hash string
 * source: https://stackoverflow.com/a/7616484
 * @param {string} str - base string
 */
const makeHash = str =>
  str.split('').reduce((acc, char, index) => {
    const code = str.charCodeAt(index);
    const hash = (acc << 5) - acc + code;
    return hash & hash;
  }, 0);

export { makeHash };

export default makeHash;
