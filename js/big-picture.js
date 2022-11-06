import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const createComment = (commentator) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = commentator.avatar;
  comment.querySelector('.social__picture').alt = commentator.name;
  comment.querySelector('.social__text').textContent = commentator.message;

  return comment;
};

const showComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentList.append(fragment);
};

const hiddenBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    hiddenBigPicture();
  }
}

const onCancelButtonClick = () => hiddenBigPicture();

const showPictureInfo = (info) => {
  bigPicture.querySelector('.big-picture__img img').src = info.url;
  bigPicture.querySelector('.big-picture__img img').alt = info.description;
  bigPicture.querySelector('.likes-count').textContent = info.likes;
  bigPicture.querySelector('.social__caption').src = info.url;
};

const addListeners = () => {
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

const showBigPicture = (info) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');

  showPictureInfo(info);
  showComments(info.comments);
  addListeners();
};

export {showBigPicture};
