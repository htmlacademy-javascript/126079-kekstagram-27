const checkStringLength = (string, length) => string.length <= length;
checkStringLength('', 140);

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const wordToNumber = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export {getRandomNumber, isEscapeKey, wordToNumber};


