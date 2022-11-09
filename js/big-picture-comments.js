import {isEscapeKey, wordToNumber} from './util.js';

const STEP_RENDER_COMMENTS = 5;
const CURRENT_COUNT_COMMENTS = 5;

const commentsContainer = document.querySelector('.social__comments');
const comment = commentsContainer.querySelector('.social__comment');
const socialPicture = comment.querySelector('img');
const socialText = comment.querySelector('p');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.social__comments-loader');
const bigPicture = document.querySelector('.big-picture');
const cancelPicture = bigPicture.querySelector('#picture-cancel');

const words = ['комментарий', 'комментария', 'комментариев'];

const createCommentList = (commentsData) => {

  let from = 0;
  let to = 5;

  commentsContainer.innerHTML = '';

  if (commentsData.length > CURRENT_COUNT_COMMENTS) {
    socialCommentCount.textContent = `${CURRENT_COUNT_COMMENTS} из ${commentsData.length} ${wordToNumber(commentsData.length, words)}`;
  } else {
    socialCommentCount.textContent = `${commentsData.length} из ${commentsData.length} ${wordToNumber(commentsData.length, words)}`;
    commentsLoaderButton.classList.add('hidden');
  }

  commentsLoaderButton.addEventListener('click', () => {
    from += STEP_RENDER_COMMENTS;
    to += STEP_RENDER_COMMENTS;

    commentsData.slice(from, to).map((commentData) => {
      const commentContainer = comment.cloneNode(true);
      const socialComm = socialCommentCount.cloneNode(true);

      socialPicture.src = commentData.avatar;
      socialPicture.alt = commentData.name;
      socialText.textContent = commentData.message;
      commentsContainer.append(commentContainer);

      if (to >= commentsData.length){
        commentsLoaderButton.classList.add('hidden');
        socialComm.classList.remove('social__comment-count');
        socialComm.innerHTML = `${commentsData.length} из <span class="comments-count">${commentsData.length}</span> ${wordToNumber(commentsData.length, words)}`;
      } else {
        socialComm.classList.remove('social__comment-count');
        socialComm.innerHTML = `${to} из <span class="comments-count">${commentsData.length}</span> ${wordToNumber(commentsData.length, words)}`;
      }

      socialCommentCount.innerHTML = '';
      socialCommentCount.append(socialComm);
    });
  });

  commentsData.slice(from, to).map(({avatar, name, message}) => {
    const commentContainer = comment.cloneNode(true);
    socialPicture.src = avatar;
    socialPicture.alt = name;
    socialText.textContent = message;
    commentsContainer.append(commentContainer);
  });

  const loaderCommentList = () => {
    document.body.classList.remove('modal-open');
    commentsLoaderButton.classList.remove('hidden');
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown (evt) {
    if (isEscapeKey){
      evt.preventDefault();
      loaderCommentList();
    }
  }

  const onCancelButtonClick = () => loaderCommentList();

  document.addEventListener('keydown', onEscKeydown);
  cancelPicture.addEventListener('click', onCancelButtonClick);
};

export {createCommentList};

