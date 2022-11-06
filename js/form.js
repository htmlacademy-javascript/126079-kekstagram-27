import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');
const body = document.querySelector('body');

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const hiddenModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const isTextFieldFocus = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocus()) {
    evt.preventDefault();
    hiddenModal();
  }
}

const onCancelButtonClick = () => {
  hiddenModal();
};

const onFileInputChange = () => {
  showModal();
};

const isValidHashtag = (tag) => HASHTAG_SYMBOLS.test(tag);

const isValidCount = (tags) => tags.length <= 5;

const isUniqueTags = (tags) => {
  const tagsToLowerCase = tags.map((tag) => tag.toLowerCase());
  return tagsToLowerCase.length === new Set(tagsToLowerCase).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isValidCount(tags) && isUniqueTags(tags) && tags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Введенный хэштег некорректен',
);

const isValidComment = (comment) => comment.length <= 140;

pristine.addValidator(
  commentField,
  isValidComment,
  'Длина комментария не должна превышать 140 символов',
);

const onSubmitForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onSubmitForm);

