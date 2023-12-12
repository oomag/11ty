import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main"

const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      '--yes': Boolean,
      '--install': Boolean,
      '-y': '--yes',
      '-i': '--install'
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    targetDirectory: args._[0],
    skipPrompts: args['--yes'] || false,
    runInstall: args['--install'] || false,
  }
}

const promptForMissingOptions = async (options)  => {
  const defaultDirectory = 'website-static';
  if (options.skipPrompts) {
    return {
      ...options,
      targetDirectory: options.targetDirectory || defaultDirectory
    }
  }

  const questions = [];
  if (!options.targetDirectory) {
    questions.push({
      type: 'prompt',
      name: 'targetDirectory',
      message: 'Please type the directory name for initialization project',
      default: defaultDirectory
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    targetDirectory: options.targetDirectory || answers.targetDirectory,
  }
}

export const cli = async (args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
