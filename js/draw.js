import { generateDataForPhoto } from './data.js';
const COUNT_PHOTOS = 25;

const photos = generateDataForPhoto(COUNT_PHOTOS);
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

export const drawPictures = () => {
  for (let i = 0; i < photos.length; i++) {
    const templateClone = template.cloneNode(true);
    const img = templateClone.querySelector('.picture__img');
    const p = templateClone.querySelector('.picture__info');
    const comments = p.querySelector('.picture__comments');
    const likes = p.querySelector('.picture__likes');

    img.src = photos[i].url;
    img.alt = photos[i].description;
    likes.textContent = photos[i].likes;
    comments.textContent = photos[i].comments.length;

    fragment.appendChild(templateClone);
  }

  const pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
};
