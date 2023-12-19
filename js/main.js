import { thumbnailsInit } from './thumbnails-init.js';
import { uploadImg } from './submit-form.js';
import { getData } from './api.js';

getData().then((photos) => thumbnailsInit(photos));
uploadImg();
