const checkStringLength = (string, length) => string.length <= length;
checkStringLength('', 150);

const PHOTO_CARDS_COUNT = 25;
const AVATAR_COUNT = 6;

const DESCRIPTION = [
  'Рыжий кот',
  'Белый кот',
  'Черный кот',
  'Семейство котов',
  'Коты с хозяином',
  'Котики на дереве',
  'Кот играет с листочком',
  'Веселый кот',
  'Котик спит',
  'Котам показывают рыбов',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Фёдор',
  'Василий',
  'Кузьма',
  'Пётр',
  'Семён',
  'Максим',
];

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createMessage = () =>
  Array.from({ length: getRandomNumber(1, 2) }, () =>
    MESSAGE [getRandomNumber(0, MESSAGE.length - 1)]).join(' ');

const createComment = (index) => {
  const comment = {
    id: index,
    avatar: `img/avatar-${getRandomNumber(1, AVATAR_COUNT)}.svg`,
    message: createMessage (),
    name: NAME [getRandomNumber(0, NAME.length - 1)],
  };

  return comment;
};

const createPhotoCard = () => {
  const photoCard = {
    id: getRandomNumber(1, PHOTO_CARDS_COUNT),
    url: `photos/${getRandomNumber(1, PHOTO_CARDS_COUNT)}.jpg`,
    description: DESCRIPTION [getRandomNumber(0, DESCRIPTION.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: Array.from (
      { length: getRandomNumber(1, PHOTO_CARDS_COUNT) },
      (_, commentIndex) => createComment(commentIndex + 1)
    )
  };

  return photoCard;
};

const getPhotoCards = Array.from({length: PHOTO_CARDS_COUNT}, createPhotoCard);
getPhotoCards();
