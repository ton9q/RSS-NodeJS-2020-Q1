const ACTION_VALUES = {
  ENCODE: 'encode',
  DECODE: 'decode',
};

const ARGUMENTS_TEXT = {
  ACTION: '-a/--action',
  SHIFT: '-s/--shift',
  INPUT: '-i/--input',
  OUTPUT: '-o/--output',
};

const ASCII_LETTER_CODES = {
  FIRST_BIG_LETTER: 65,
  LAST_BIG_LETTER: 90,
  FIRST_SMALL_LETTER: 97,
  LAST_SMALL_LETTER: 122,
};

module.exports = {
  ACTION_VALUES,
  ARGUMENTS_TEXT,
  ASCII_LETTER_CODES,
};
