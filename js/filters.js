import { thumbnailsInit } from './thumbnails-init.js';
import { sortByComments, sortRandom } from './util.js';

const HIDDEN_CONTAINER_CLASS = 'img-filters--inactive';
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const MAX_COUNT_RANDOM_CARD = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let thumbnails = null;
let activeFilter = Filter.DEFAULT;

const filterFunction = {
  [Filter.DEFAULT]: () => thumbnails,
  [Filter.RANDOM]: () => thumbnails.slice().sort(sortRandom).slice(0, MAX_COUNT_RANDOM_CARD),
  [Filter.DISCUSSED]: () => thumbnails.slice().sort(sortByComments)
};

const onFiltersContainerClick = (evt) => {
  const id = evt.target.id;
  if (id && id !== activeFilter) {
    filtersForm.querySelector(`#${activeFilter}`).classList.remove(ACTIVE_FILTER_CLASS);
    evt.target.classList.add(ACTIVE_FILTER_CLASS);
    activeFilter = id;

    thumbnailsInit(filterFunction[id]());
  }
};

export const initFilters = (data) => {
  thumbnails = data.slice();

  filtersContainer.classList.remove(HIDDEN_CONTAINER_CLASS);
  filtersContainer.addEventListener('click', onFiltersContainerClick);

  thumbnailsInit(thumbnails);
};
