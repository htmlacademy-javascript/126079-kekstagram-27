import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onResultCloseClick = () => document.body.lastChild.remove();

const onResultEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onResultCloseClick();
  }
};

const onWindowClick = (evt) => {
  if (!evt.target.closest('div')) {
    onResultCloseClick();
    window.removeEventListener('click', onWindowClick);
  }
};

const addEventListeners = () => {
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onResultEscPress);
};

const removeEventListeners = () => {
  window.removeEventListener('click', onWindowClick);
  document.removeEventListener('keydown', onResultEscPress);
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  document.body.append(successMessage);
  addEventListeners();

  successButton.addEventListener('click', onResultCloseClick);
  successButton.addEventListener('click', () => {
    successMessage.remove();
    successButton.removeEventListener('click', onResultCloseClick);
    removeEventListeners();
  });
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  document.body.append(errorMessage);
  addEventListeners();

  errorButton.addEventListener('click', onResultCloseClick);
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
    errorButton.removeEventListener('click', onResultCloseClick);
    removeEventListeners();
  });
};

export {showSuccessMessage, showErrorMessage};
