import { thumbnailsInit } from './thumbnails-init.js';
import { generateDataForPhoto } from './data.js';
import { uploadImg } from './submit-form.js';

const COUNT_PHOTOS = 25;
const photos = generateDataForPhoto(COUNT_PHOTOS);

thumbnailsInit(photos);
uploadImg();
