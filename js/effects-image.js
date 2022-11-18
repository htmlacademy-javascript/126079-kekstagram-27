const RANGE_OPTIONS = {
  grayscale: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  invert: {
    min: 0,
    max: 100,
    step: 1,
  },
  blur: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  brightness: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const FILTER_NAME = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

const UNIT = {
  invert: '%',
  blur: 'px',
};

const image = document.querySelector('.img-upload__preview img');
const sliderField = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const createSlider = () => {
  noUiSlider.create(sliderField, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const resetFilter = () => {
  image.style.filter = null;
  image.className = '';
  sliderField.classList.add('hidden');
};

const changeEffect = ({target}) => {
  if (target.value === 'none') {
    resetFilter();
    return;
  }

  if (!sliderField.noUiSlider) {
    createSlider();
  }

  sliderField.classList.remove('hidden');

  const effect = FILTER_NAME[target.value];

  const {min, max, step} = RANGE_OPTIONS[effect];
  const unit = UNIT[effect] ? UNIT[effect] : '';

  image.className = '';

  sliderField.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
    connect: 'lower',
  });

  sliderField.noUiSlider.on('update', () => {
    effectLevel.value = sliderField.noUiSlider.get();
    image.style.filter = `${effect}(${effectLevel.value}${unit})`;
  });
};

export {changeEffect, resetFilter};
