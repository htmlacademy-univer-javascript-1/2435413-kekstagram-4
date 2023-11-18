import { drawPictures } from './draw.js';
import { generateDataForPhoto } from './data.js';
const COUNT_PHOTOS = 25;
const photos = generateDataForPhoto(COUNT_PHOTOS);
drawPictures(photos);
