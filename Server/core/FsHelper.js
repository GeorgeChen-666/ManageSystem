const fs = require('fs');
const checkOrCreateFolder = (path) => {
  try {
    fs.statSync(path);
  } catch (e) {
    fs.mkdirSync(path);
  }
};
const getFolderItems = (path) => {
  return fs.readdirSync(path);
};
module.exports = {
  checkOrCreateFolder,
  getFolderItems,
};
