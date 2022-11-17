import {isEscapeKey, wordToNumber} from './util.js';

const PART_OF_COMMENTS = 5;
const ENDINGS = ['комментария', 'комментариев', 'комментариев'];

const closeButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');

const likesCount = document.querySelector('.likes-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');

const pictureDescription = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

let displayedComments = 0;
let comments;
let commentsLength;

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeEventListener();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const renderComments = (array) => {
  array.forEach((item) => {
    const comment = commentItem.cloneNode(true);
    const commentImg = comment.querySelector('.social__picture');
    commentImg.src = item.avatar;
    commentImg.alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    commentsList.append(comment);
  });
};

const updateCommentLoaderBtn = () => {
  if (displayedComments === comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
  socialCommentsLoader.classList.remove('hidden');
};

const showComments = (from, to) => {
  displayedComments = Math.min(to, comments.length);
  renderComments(comments.slice(from, displayedComments));

  socialCommentCount.textContent = `${displayedComments} из ${commentsLength} ${wordToNumber(commentsLength, ENDINGS)}`;
  updateCommentLoaderBtn();
};

const onCommentLoaderBtnClick = (evt) => {
  evt.preventDefault();
  showComments(displayedComments, displayedComments + PART_OF_COMMENTS);
};

function removeEventListener() {
  document.removeEventListener('keydown', onEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  socialCommentsLoader.removeEventListener('click', onCommentLoaderBtnClick);
}

const addModalListeners = () => {
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  socialCommentsLoader.addEventListener('click', onCommentLoaderBtnClick);
};

const fillBigPicture = (picture) => {
  commentsList.innerHTML = '';
  bigPictureImage.src = picture.url;
  bigPictureImage.alt = picture.description;
  likesCount.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  document.body.classList.add('modal-open');

  comments = picture.comments;
  commentsLength = comments.length;

  fillBigPicture(picture);
  showComments(0, PART_OF_COMMENTS);
  addModalListeners();
};

export {showBigPicture, closeModal};
