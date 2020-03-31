const {
  isLetter,
  getLetter,
  getAlphabetSize,
} = require('./ascii_letter.service');

function encode(text, shift) {
  let result = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const symbol of text) {
    if (isLetter(symbol)) {
      result += getLetter(symbol, shift);
      continue; // eslint-disable-line no-continue
    }

    result += symbol;
  }
  return result;
}

function decode(text, shift) {
  const reverseShift = getAlphabetSize() - shift;
  return encode(text, reverseShift);
}
module.exports = {
  encode,
  decode,
};
