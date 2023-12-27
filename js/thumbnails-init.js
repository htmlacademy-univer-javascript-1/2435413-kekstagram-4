import { openViewPopup } from './draw-big-picture.js';
import { appendCloneInBody } from './utils.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const thumbnailsContainer = document.querySelector('.pictures');

const errorMessageTemplate = document.querySelector('#error').content.cloneNode(true);
const successMessageTemplate = document.querySelector('#success').content.cloneNode(true);

export const errorMessageClone = errorMessageTemplate.firstElementChild;
export const successMessageClone = successMessageTemplate.firstElementChild;

const destroyThumbnails = () => document.querySelectorAll('.picture').forEach((picture) => thumbnailsContainer.removeChild(picture));

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

  destroyThumbnails();

  thumbnailsContainer.appendChild(fragment);
  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => openViewPopup(photos[index]));
  });
};
