import chalk from 'chalk';

export const LOGGER = {
  info: (message: string): void => {
    console.log(chalk.blue(`[INFO] ${message}`));
  },
  highlight: (message: string): void => {
    console.warn(chalk.bgCyanBright(`[INFO] ${message}`));
  },
  warn: (message: string, location?: string): void => {
    if (location) {
      console.warn(
        chalk.yellow(`[ERROR - ${chalk.magenta(location)}] - ${message}`),
      );
      return;
    }
    console.log(chalk.yellow(`[WARN] ${message}`));
  },
  error: (message: string, location?: string): void => {
    if (location) {
      console.error(
        chalk.redBright(`[ERROR - ${chalk.magenta(location)}] - ${message}`),
      );
      return;
    }

    console.error(chalk.red(`[ERROR] ${message}`));
  },
};
