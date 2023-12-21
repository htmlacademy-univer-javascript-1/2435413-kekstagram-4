import { uploadImg } from './submit-form.js';
import { initFilters } from './filters.js';
import { getData } from './api.js';

getData().then((photos) => initFilters(photos));
uploadImg();
