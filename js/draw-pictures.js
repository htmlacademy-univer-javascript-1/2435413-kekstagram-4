import { openViewPopup } from './draw-big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

export const drawPictures = (photos) => {
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

  picturesContainer.appendChild(fragment);
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', () => openViewPopup(photos[index]));
  });
};
