const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const randomValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (randomValues.length >= (max - min + 1)) {
      return null;
    }
    while (randomValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    randomValues.push(currentValue);
    return currentValue;
  };
};

const createRandomArrayFromRange = (min, max, count) => {
  const generate = createRandomIdFromRangeGenerator(min, max);
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(generate());
  }
  return result;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createWordToNumber = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export {isEscapeKey, createWordToNumber, debounce, createRandomArrayFromRange};


