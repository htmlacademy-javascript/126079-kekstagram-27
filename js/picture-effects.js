const uploadImageForm = document.querySelector('.img-upload__form');
const image = uploadImageForm.querySelector('.img-upload__preview img');
const sliderElementField = uploadImageForm.querySelector('.img-upload__effect-level');

const smallerScaleButton = uploadImageForm.querySelector('.scale__control--smaller');
const biggerScaleButton = uploadImageForm.querySelector('.scale__control--bigger');
const scaleInput = uploadImageForm.querySelector('.scale__control--value');

const sliderElement = sliderElementField.querySelector('.effect-level__slider');
const effectLevel = sliderElementField.querySelector('.effect-level__value');
const effectsList = uploadImageForm.querySelector('.effects__list');

const EFFECT_VALUE_FORMAT = /\d{1,3}(\.\d)?/;

const SCALE_STEP = 25;
const SCALE_RANGE = {
  MIN: '25%',
  MAX: '100%',
};

const EFFECTS = {
  'none': {
    filter: '',
  },
  'chrome': {
    filter: 'grayscale(1)',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'sepia': {
    filter: 'sepia(1)',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'marvin': {
    filter: 'invert(100%)',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  'phobos': {
    filter: 'blur(3px)',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  'heat': {
    filter: 'brightness(3)',
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

const onBiggerButtonClick = () => {
  if (scaleInput.value !== SCALE_RANGE.MAX) {
    scaleInput.value = `${Number(scaleInput.value.replace('%', '')) + SCALE_STEP}%`;
    image.style.transform = `scale(${Number(scaleInput.value.replace('%', '')) / 100})`;
  }
};

const onSmallerButtonClick = () => {
  if (scaleInput.value !== SCALE_RANGE.MIN) {
    scaleInput.value = `${Number(scaleInput.value.replace('%', '')) - SCALE_STEP}%`;
    image.style.transform = `scale(${Number(scaleInput.value.replace('%', '')) / 100})`;
  }
};

const hideSliderTool = () => {
  sliderElementField.classList.add('hidden');
  sliderElement.setAttribute('disabled', true);
};

const showSliderTool = () => {
  sliderElementField.classList.remove('hidden');
  sliderElement.removeAttribute('disabled');
};

const onChangeFilter = (evt) => {
  const filterType = evt.target.closest('input[type="radio"]').value;
  image.className = image.className.replace(/\beffects__preview--\w+\b/, `effects__preview--${filterType}`);

  if (filterType === 'none') {
    hideSliderTool();
    effectLevel.value = '';
  } else {
    showSliderTool();
    sliderElement.noUiSlider.updateOptions(EFFECTS[filterType]);
  }

  image.style.filter = EFFECTS[filterType].filter;
};

const updateEffectValue = (values, handle) => {
  effectLevel.value = sliderElement.hasAttribute('disabled') ? '' : (+values[handle]).toFixed(1);
  image.style.filter = image.style.filter.replace(EFFECT_VALUE_FORMAT, effectLevel.value);
};

const loadFilters = () => {
  scaleInput.value = SCALE_RANGE.MAX;
  biggerScaleButton.addEventListener('click', onBiggerButtonClick);
  smallerScaleButton.addEventListener('click', onSmallerButtonClick);

  image.classList.add('effects__preview--none');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 1,
    connect: 'lower',
  });
  hideSliderTool();

  image.style.filter = EFFECTS['none'];

  effectsList.addEventListener('change', onChangeFilter);
  sliderElement.noUiSlider.on('update', updateEffectValue);
};

const resetFilter = () => {
  scaleInput.value = SCALE_RANGE.MAX;
  biggerScaleButton.removeEventListener('click', onBiggerButtonClick);
  smallerScaleButton.removeEventListener('click', onSmallerButtonClick);
  effectsList.removeEventListener('change', onChangeFilter);

  image.className = image.className.replace(/\beffects__preview--\w+\b/, '');
  effectLevel.value = '';

  sliderElement.noUiSlider.destroy();
  image.removeAttribute('style');
};

export {loadFilters, resetFilter};
