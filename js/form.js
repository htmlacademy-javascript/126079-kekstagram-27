import {isEscapeKey} from './util.js';
import {addValidator, pristineReset, pristineValidate} from './form-validate.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const body = document.querySelector('body');

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

const hideModal = () => {
  form.reset();
  pristineReset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
};

function onCancelButtonClick () {
  hideModal();
}

const isTextFieldFocus = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocus()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFileInputChange = () => {
  showModal();
};

const onSubmitForm = (evt) => {
  if (!pristineValidate()) {
    evt.preventDefault();
  }
};

const addAddFormAction = () => {
  addValidator();
  fileField.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onSubmitForm);
};

export {addAddFormAction};

