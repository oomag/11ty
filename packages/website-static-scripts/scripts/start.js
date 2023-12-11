const execa = require('execa');
const Eleventy = require("@11ty/eleventy");
const paths = require('../utils/paths');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8888;

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
      elev.watch().then(() => {
        elev.serve(DEFAULT_PORT);
      });
    });
})();
