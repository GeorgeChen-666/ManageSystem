const fs = require('fs');
const path = require('path');
const checkOrCreateFolder = (pathName) => {
  try {
    fs.statSync(pathName);
  } catch (e) {
    fs.mkdirSync(pathName);
  }
};
const getFolderItems = (pathName) => {
  return fs.readdirSync(pathName);
};
module.exports = {
  checkOrCreateFolder,
  getFolderItems
};
