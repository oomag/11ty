
const path = require('path');
const fs = require('fs');
const ownPackageJson = require('../package.json');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const buildPath = process.env.BUILD_PATH || 'build';

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  ownPath: resolveApp(`node_modules/${ownPackageJson.name}`),
};

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

const websiteScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const websiteScriptsLinked =
  fs.existsSync(websiteScriptsPath) &&
  fs.lstatSync(websiteScriptsPath).isSymbolicLink();

// utils before publish: we're in ./packages/website-static-scripts/utils/
if (
  !websiteScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'website-static-scripts', 'config')) !== -1
) {
  const templatePath = '../template';
  module.exports = {
    dotenv: resolveOwn(`${templatePath}/.env`),
    appPath: resolveApp('.'),
    appBuild: resolveOwn(path.join('../..', buildPath)),
    appPackageJson: resolveOwn('package.json'),
    appSrc: resolveOwn(`${templatePath}/src`),
    appNodeModules: resolveOwn('node_modules'),
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
  };
}
// @remove-on-eject-end

module.exports.moduleFileExtensions = ['js'];
