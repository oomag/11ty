const execa = require('execa');
const Eleventy = require("@11ty/eleventy");
const paths = require('../utils/paths');

(async function() {
  await execa('rm', ['-rf', paths.appBuild], {
    cwd: paths.appPath,
  });

  let elev = new Eleventy(paths.appSrc, paths.appBuild, {
    configPath: `${paths.ownPath}/config/.eleventy.js`,
  });

  elev
    .init()
    .then(() => {
      elev.write();
    });
})();
