import { isEscapeKey } from './util.js';
import { renderComments } from './render-data.js';
import { renderMainData } from './render-data.js';

const bigPicture = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeViewPopup();
  }
};

function closeViewPopup() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const openViewPopup = (pictures, photos) => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', () => {openPopup(photos[i]);});
  }

  closeBtn.addEventListener('click', () => {
    closeViewPopup();
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

function openPopup(photo) {
  renderMainData(photo);
  renderComments(photo.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}
