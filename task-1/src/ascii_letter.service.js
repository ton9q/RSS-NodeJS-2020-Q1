const { ASCII_LETTER_CODES } = require('./constants');

const {
  FIRST_BIG_LETTER,
  LAST_BIG_LETTER,
  FIRST_SMALL_LETTER,
  LAST_SMALL_LETTER,
} = ASCII_LETTER_CODES;

const ALPHABET_SIZE = LAST_BIG_LETTER - FIRST_BIG_LETTER + 1;

function isBigLetter(code) {
  return code >= FIRST_BIG_LETTER && code <= LAST_BIG_LETTER;
}

function isSmallLetter(code) {
  return code >= FIRST_SMALL_LETTER && code <= LAST_SMALL_LETTER;
}

function isLetter(letter) {
  const code = letter.charCodeAt(0);
  return isBigLetter(code) || isSmallLetter(code);
}

function getLetter(letter, shift) {
  const code = letter.charCodeAt(0);
  const firstLetterCode = isBigLetter(code) ? FIRST_BIG_LETTER : FIRST_SMALL_LETTER;
  const letterNumber = code - firstLetterCode;
  const shiftedLetterNumber = (letterNumber + shift) % ALPHABET_SIZE;
  return String.fromCharCode(shiftedLetterNumber + firstLetterCode);
}

module.exports = {
  isLetter,
  getLetter,
  getAlphabetSize: () => ALPHABET_SIZE,
};
