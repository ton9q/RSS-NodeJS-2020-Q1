const path = require('path');
const appRootPath = require('app-root-path').toString();

module.exports = module => {
  return path.relative(appRootPath, module.filename);
};
