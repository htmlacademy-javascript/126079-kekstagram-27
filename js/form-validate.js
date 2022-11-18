const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidComment = (comment) => comment.length <= MAX_COMMENTS_LENGTH;

const createHashtagArray = (value) => value.split(' ');

const isValidHashtag = (value) => {
  if (!value) {
    return true;
  }

  const hashtag = createHashtagArray(value);

  return hashtag.every((test) => HASHTAG_SYMBOLS.test(test));
};

const isValidCount = (value) => {
  const hashtag = createHashtagArray(value);

  return hashtag.length <= MAX_HASHTAG_COUNT;
};

const isUniqueHashtags = (value) => {
  const hashtag = createHashtagArray(value);
  const uniqHashtag = new Set(hashtag);

  return uniqHashtag.size === hashtag.length;
};

const addValidator = () => {
  pristine.addValidator(
    hashtagField,
    isValidHashtag,
    'Хэштег должен начинаться с "#", содержать буквы и цифры (не более 20 символов, включая #)',
  );

  pristine.addValidator(
    hashtagField,
    isUniqueHashtags,
    'Хэштеги не должны повторяться',
  );

  pristine.addValidator(
    hashtagField,
    isValidCount,
    'Нельзя указать больше пяти хэштегов',
  );

  pristine.addValidator(
    commentField,
    isValidComment,
    'Длина комментария не должна превышать 140 символов',
  );
};

const pristineReset = () => pristine.reset();
const pristineValidate = () => pristine.validate();

export {addValidator, pristineReset, pristineValidate};
