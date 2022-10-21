import {getRandomNumber} from './util.js';

const PHOTO_CARDS_COUNT = 25;

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

let cardIndex = 1;
let commentIndex = 1;

const createMessage = () => {
  const messages = Array.from({length: getRandomNumber(1, 2)}, () => MESSAGE[getRandomNumber(0, MESSAGE.length - 1)]);

  return [...new Set(messages)].join(' ');
};

const createComment = () => {
  const comment = {
    id: commentIndex,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createMessage (),
    name: NAME [getRandomNumber(0, NAME.length - 1)],
  };

  commentIndex += 1;

  return comment;
};

const createComments = () => Array.from({length: getRandomNumber(1, 6)}, createComment);

const createPhotoCard = () => {
  const photoCard = {
    id: cardIndex,
    url: `photos/${cardIndex}.jpg`,
    description: DESCRIPTION [getRandomNumber(0, DESCRIPTION.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: createComments(),
  };

  cardIndex += 1;

  return photoCard;
};

const createNewPhotoCards = () => Array.from({length: PHOTO_CARDS_COUNT}, createPhotoCard);

export {createNewPhotoCards};
