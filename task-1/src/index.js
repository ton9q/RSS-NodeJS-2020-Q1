const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { pipeline, Transform } = require('stream');
const validateArguments = require('./validate_arguments');
const { ACTION_VALUES } = require('./constants');
const { encode, decode } = require('./cypher');

program
  .option('-s, --shift <value>', 'a shift for encoding/decoding')
  .option('-a, --action <value>', 'an action encoding/decoding')
  .option('-i, --input <file_path>', 'an input file')
  .option('-o, --output <file_path>', 'an output file');

program.parse(process.argv);
const args = program.opts();

validateArguments(args);

const readStream = args.input
  ? fs.createReadStream(path.resolve(__dirname, args.input), { encoding: 'utf8' })
  : process.stdin;

const writeStream = args.output
  ? fs.createWriteStream(path.resolve(__dirname, args.output), { flags: 'a', encoding: 'utf8' })
  : process.stdout;

function getCypherFunction(action) {
  switch (action) {
    case ACTION_VALUES.ENCODE:
      return encode;
    case ACTION_VALUES.DECODE:
      return decode;
    default:
      return null;
  }
}

function getTransformStream(cypherFunction, shift) {
  return new Transform({
    transform(chunkText, encoding, callback) {
      this.push(cypherFunction(chunkText.toString(), Number(shift)));
      callback();
    },
  });
}

pipeline(
  readStream,
  getTransformStream(getCypherFunction(args.action), args.shift),
  writeStream,
  (err) => {
    if (err) {
      process.stderr.write('Pipeline failed.\n', err);
    } else {
      process.stdout.write('Finished.');
    }
  },
);
