import { drawPictures } from './draw.js';
import { generateDataForPhoto } from './data.js';
import { openViewPopup } from './draw-big-picture.js';

const COUNT_PHOTOS = 25;
const photos = generateDataForPhoto(COUNT_PHOTOS);
drawPictures(photos);

const pictures = document.querySelectorAll('.picture');

openViewPopup(pictures, photos);
