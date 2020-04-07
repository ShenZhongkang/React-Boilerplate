#!/usr/bin/env node

const shelljs = require('shelljs');
const chalk = require('chalk');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');

const progress = animateProgress('Generating stats');

// generate stats.json file with webpack.
shelljs.exec('cross-env NODE_ENV=production webpack --config config/webpack/webpack.config.prod.js --json > stats.json', addCheckMark.bind(null, callback));

function callback() {
  clearInterval(progress);
  process.stdout.write(
    `\n\nOpen ${chalk.magenta(
      'http://webpack.github.io/analyse/',
    )} in your browser and upload the stats.json file!${chalk.blue(
      `\n(Tip: ${chalk.italic('CMD + double-click')} the link!)\n\n`,
    )}`,
  );
}