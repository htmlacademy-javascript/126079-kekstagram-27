import {showBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = ({url, description, comments, likes}) => {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  picture.addEventListener('click', () => {
    showBigPicture({url, description, comments, likes});
  });

  return picture;
};

const container = document.querySelector('.pictures');

const showPictures = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    container.append(pictureElement);
  });
};

export {showPictures};
