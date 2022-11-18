import {showModal} from './form.js';

const VALID_IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PREVIEW_IMAGE = 'img/upload-default-image.jpg';

const imageInput = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

imageInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const isFormatValid = VALID_IMAGE_TYPES.some((type) => fileName.endsWith(type));

  if (isFormatValid) {
    showModal();

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagePreview.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${reader.result}')`;
      });
    });

    reader.readAsDataURL(file);
  }
});

const resetFileInput = () => {
  imageInput.value = '';

  imagePreview.src = DEFAULT_PREVIEW_IMAGE;
  effectsPreview.src = DEFAULT_PREVIEW_IMAGE;
};

export {resetFileInput};
