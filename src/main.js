import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import os from "os";

const access = promisify(fs.access);
const copy = promisify(ncp);

const currentFileUrl = import.meta.url;
const rootDir = path.resolve(
  new URL(currentFileUrl).pathname,
  '../../',
);
const packagesDir = path.join(rootDir, 'packages');


const copyTemplateFiles = async (options) => {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  })
}

const replaceLocalDependencies = async (options) => {
  const {name, version} = JSON.parse(fs.readFileSync(path.join(packagesDir, 'website-static-scripts','package.json'), 'utf8'));

  const packageInfo = {name, version};

  const packageJson = JSON.parse(fs.readFileSync(path.join(options.targetDirectory,'package.json'), 'utf8'));

  const newPackageJson = {
    name: options.targetDirectory,
    version: '0.1.0',
    private: true,
    ...packageJson
  }
  newPackageJson.dependencies[packageInfo.name] = `^${packageInfo.version}`

  fs.writeFileSync(
    path.join(options.targetDirectory, 'package.json'),
    JSON.stringify(newPackageJson, null, 2) + os.EOL
  );

  return;
}


export const createProject = async (options) => {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const templateDir = path.join(
    packagesDir,
    'template',
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.emit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Replace local dependencies',
      task: () => replaceLocalDependencies(options),
    },

    {
      title: 'Install dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory
      }),
      skip: () => !options.runInstall ? 'Pass --install to automatically install'
        : undefined,
    },
  ]);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
