import {addAddFormAction} from './form.js';
import {getData} from './api.js';
import {initFilterButtons} from './picture-list-filters.js';
import {createPictureList} from './render-picture.js';
import {closeModal} from './big-picture.js';
import {showErrorMessage} from './messages.js';

(async () => {
  try {
    const imagesArray = await getData();
    initFilterButtons(imagesArray);
    createPictureList(imagesArray);
    closeModal();
    addAddFormAction();
  } catch {
    showErrorMessage('Произошла ошибка при загрузке данных');
  }
})();


