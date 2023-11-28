import { isEscapeKey } from './util.js';
import { renderComments } from './render-data.js';
import { onBtnClick, renderMainData, loadBtn } from './render-data.js';

const bigPicture = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeViewPopup();
  }
};

const onCloseBtnClick = () => closeViewPopup();

function closeViewPopup() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  loadBtn.removeEventListener('click', onBtnClick);
}

export const openViewPopup = (pictures, photos) => {
  pictures.forEach((picture, index) =>  {
    picture.addEventListener('click', () => openPopup(photos[index]));
  });
};

function openPopup(photo) {
  renderMainData(photo);
  renderComments(photo.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeBtn.addEventListener('click', onCloseBtnClick);
}
