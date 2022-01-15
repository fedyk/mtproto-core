const fs = require("fs")
const Configstore = require('configstore');
const baseDebug = require('../../src/utils/common/base-debug');

const debug = baseDebug.extend('storage');

function getLocalStorage(options) {
  if (!options.path) {
    throw new Error('Specify the storageOptions.path for storing session');
  }

  let cache = {}

  if (fs.existsSync(options.path)) {
    cache = require(options.path)
  }

  function get(key) {
    return cache[key]
  }

  function set(key, value) {
    cache[key] = value
    fs.writeFileSync(options.path, JSON.stringify(cache))
  }

  return { get, set }
}

module.exports = getLocalStorage;
