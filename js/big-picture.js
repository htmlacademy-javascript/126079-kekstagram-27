import {createCommentList} from './big-picture-comments.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const imgage = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const cancelPicture = bigPicture.querySelector('#picture-cancel');
const socialCaption = bigPicture.querySelector('.social__caption');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => hideBigPicture();

cancelButton.addEventListener('click', onCancelButtonClick);

const showBigPicture = (imageData) => {

  document.body.classList.add('modal-open');
  cancelPicture.addEventListener('click', onCancelButtonClick);
  window.addEventListener('keydown', onEscKeydown);
  bigPicture.classList.remove('hidden');

  imgage.src = imageData.url;
  likes.textContent = imageData.likes;
  socialCaption.textContent = imageData.description;
  createCommentList(imageData.comments);
};

export {showBigPicture};
