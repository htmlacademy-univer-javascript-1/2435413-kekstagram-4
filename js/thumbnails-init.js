import { openViewPopup } from './draw-big-picture.js';
import { appendCloneInBody } from './utils.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const errorMessageTemplate = document.querySelector('#error').content.cloneNode(true);
const successMessageTemplate = document.querySelector('#success').content.cloneNode(true);
const loadMessageTemplate = document.querySelector('#messages').content.cloneNode(true);

export const errorMessageClone = errorMessageTemplate.firstElementChild;
export const successMessageClone = successMessageTemplate.firstElementChild;
export const loadMessageClone = loadMessageTemplate.firstElementChild;

const destroyThumbnails = () => document.querySelectorAll('.picture').forEach((picture) => picturesContainer.removeChild(picture));

export const thumbnailsInit = (photos) => {
  photos.forEach((photo) => {
    const templateClone = template.cloneNode(true);
    const img = templateClone.querySelector('.picture__img');
    const p = templateClone.querySelector('.picture__info');
    const comments = p.querySelector('.picture__comments');
    const likes = p.querySelector('.picture__likes');

    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    fragment.appendChild(templateClone);
  });

  appendCloneInBody(errorMessageClone);
  appendCloneInBody(successMessageClone);
  appendCloneInBody(loadMessageClone);

  destroyThumbnails();

  picturesContainer.appendChild(fragment);
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', () => openViewPopup(photos[index]));
  });
};
