import { uploadImg } from './submit-form.js';
import { initFilters } from './filters.js';
import { getData } from './api.js';
import { debounce } from './utils.js';
import { thumbnailsInit } from './thumbnails-init.js';

getData().then((photos) => initFilters(photos, debounce(thumbnailsInit, 500)));
uploadImg();
