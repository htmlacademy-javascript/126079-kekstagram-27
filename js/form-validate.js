const form = document.querySelector('.img-upload__form');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidComment = (comment) => comment.length <= 140;

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

const addValidator = () => {
  /* pristine.addValidator(
    hashtagField,
    isValidHashtag,
    //validateTags,
    '1. Хэштег начинается с # и должен включать минимум 1 символ; 2. Максимальная длина одного хэштега – 20 символов; 3. Строка после решётки должна состоять из букв и чисел, хэштег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д.',
  );

  pristine.addValidator(
    hashtagField,
    isUniqueTags,
    //validateTags,
    'Хэштеги не должны повторяться',
  );

  pristine.addValidator(
    hashtagField,
    isValidCount,
    //validateTags,
    'Нельзя указать больше пяти хэштегов',
  ); */

  pristine.addValidator(
    hashtagField,
    validateTags,
    'Введенный хэштег некорректен',
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
