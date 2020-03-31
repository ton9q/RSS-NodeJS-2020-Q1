const fs = require('fs');
const path = require('path');
const { ACTION_VALUES, ARGUMENTS_TEXT } = require('./constants');

const { ACTION, SHIFT } = ARGUMENTS_TEXT;

function getNotValidErrorMessage(text) {
  return `Error: The value of parameter ${text} is not valid\n`;
}

function getNotReceivedErrorMessage(text) {
  return `Error: The argument ${text} wasn't received\n`;
}

function getNotExistingFileErrorMessage(filePath) {
  return `Error: File ${filePath} doesn't exist!`;
}

function exitError() {
  process.exit(1);
}

function validateExistingFile(filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    process.stderr.write(getNotExistingFileErrorMessage(filePath));
    exitError();
  }
}

module.exports = (args) => {
  if (!args.shift) {
    process.stderr.write(getNotReceivedErrorMessage(SHIFT));
    exitError();
  }

  if (!args.action) {
    process.stderr.write(getNotReceivedErrorMessage(ACTION));
    exitError();
  }

  if (!Object.values(ACTION_VALUES).includes(args.action)) {
    process.stderr.write(getNotValidErrorMessage(ACTION));
    exitError();
  }

  if (Number.isNaN(Number(args.shift))) {
    process.stderr.write(getNotValidErrorMessage(SHIFT));
    exitError();
  }

  if (args.input) {
    const filePath = path.resolve(__dirname, args.input);
    validateExistingFile(filePath);
  }

  if (args.output) {
    const filePath = path.resolve(__dirname, args.output);
    validateExistingFile(filePath);
  }
};
