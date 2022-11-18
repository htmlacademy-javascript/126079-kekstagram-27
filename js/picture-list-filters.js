import {createRandomArrayFromRange, debounce} from './util.js';
import {createPictureList} from './render-picture.js';

const DEBOUNCE_DELAY = 500;

const imageFiltersForm = document.querySelector('.img-filters__form');
const imageFiltersButton = document.querySelectorAll('.img-filters__button');

const toggleActiveButton = (button) => {
  imageFiltersButton.forEach((el) => {
    el.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
};

const applyFilter = (id, imagesArray) => {
  let newImageArray = [];
  switch (id) {
    case 'filter-random':
      newImageArray = createRandomArrayFromRange(0, imagesArray.length - 1, 10)
        .map((index) => imagesArray[index]);
      break;
    case 'filter-discussed':
      newImageArray = imagesArray.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      newImageArray = imagesArray;
  }

  createPictureList(newImageArray);
};

const applyTimeOut = debounce(applyFilter, DEBOUNCE_DELAY);

const initFilterButtons = (imagesArray) => {
  imageFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      toggleActiveButton(evt.target);
      applyTimeOut(evt.target.id, imagesArray);
    }
  });
};

export {initFilterButtons};
