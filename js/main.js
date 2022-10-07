function getRandomNumber (a, b) {
  if (a < 0 || b < 0 || a > b) {
    return NaN;
  }

  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}

function getStringLength (string, length) {
  return string.length <= length;
}

getRandomNumber(1, 10);
getStringLength('', 150);
