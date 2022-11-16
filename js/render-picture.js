import {showBigPicture} from './big-picture.js';
import {showErrorMessage} from './messages.js';
import {getData} from './api.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const removeOLdPictureList = () => {
  picturesContainer.querySelectorAll('.picture').forEach((item) => item.remove());
};

const createPictureList = (pictureData) => {
  const pictureListFragment = document.createDocumentFragment();
  removeOLdPictureList();

  pictureData.forEach(({id, description, url, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.href = `#${id}`;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;

    pictureListFragment.append(picture);

    picture.addEventListener('click', () => {
      showBigPicture({url, description, comments, likes});
    });
  });

  picturesContainer.append(pictureListFragment);
};

const getPictureList = () => {
  getData()
    .then((data) => {
      createPictureList(data);
    })
    .catch(() => {
      showErrorMessage('Фотографии отсутствуют...');
    });
};

export {getPictureList};

