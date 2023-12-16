import { isEscapeKey } from './util.js';
import { switchEffects, removeClickEffectsContainer } from './switch-effects.js';

const ValuesScaleCtrl = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

const MAX_COUNT_HASHTAGS = 5;
const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png'];

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const inputFile = imgUpload.querySelector('.img-upload__input');
const popup = imgUpload.querySelector('.img-upload__overlay');
const closeBtn = popup.querySelector('.img-upload__cancel');
const inputHashtag = popup.querySelector('.text__hashtags');

const scaleCtrl = popup.querySelector('.img-upload__scale');
const valueCtrl = scaleCtrl.querySelector('.scale__control--value');
const picture = popup.querySelector('.img-upload__preview');

let currentValueCtrl = +valueCtrl.value.slice(0, -1);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__input'
});

const getHashtags = () => inputHashtag.value.trim().split(' ');

const isValid = () => pristine.validate();

const isValidHashtags = () => getHashtags().every((hashtag) => REGEX.test(hashtag)) || inputHashtag.value === '';

const isCorrectCountHashtags = () => getHashtags().length <= MAX_COUNT_HASHTAGS;

const hasNotDuplicatesHashtags = () => (new Set(getHashtags())).size === getHashtags().length;


const onInputKeydown = (evt) => {
  isValid();

  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeViewPopup();
  }
};

const submitForm = (evt) => {
  if (!isValid()) {
    evt.preventDefault();
  }
};

pristine.addValidator(inputHashtag, isValidHashtags, 'введён невалидный хэш-тег');
pristine.addValidator(inputHashtag, isCorrectCountHashtags, 'превышено количество хэш-тегов');
pristine.addValidator(inputHashtag, hasNotDuplicatesHashtags, 'хэш-теги повторяются');

const isValidFileType = (file) => FILE_TYPES.some((type) => file.type === type);

const onScaleCtrlClick = (evt) => {
  currentValueCtrl = +valueCtrl.value.slice(0, -1);

  if (evt.target.textContent === 'Уменьшить') {
    currentValueCtrl = Math.max(ValuesScaleCtrl.MIN, currentValueCtrl - ValuesScaleCtrl.STEP);
  }
  if (evt.target.textContent === 'Увеличить') {
    currentValueCtrl = Math.min(ValuesScaleCtrl.MAX, currentValueCtrl + ValuesScaleCtrl.STEP);
  }

  valueCtrl.value = `${currentValueCtrl}%`;
  picture.style.scale = currentValueCtrl / 100;
};

const openViewPopup = () => {
  const file = inputFile.files[0];

  if (isValidFileType(file)) {
    popup.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    closeBtn.addEventListener('click', closeViewPopup);
    form.addEventListener('keydown', onInputKeydown);
    form.addEventListener('submit', submitForm);
    inputFile.removeEventListener('change', openViewPopup);

    valueCtrl.value = '100%';
    picture.style.scale = 1;

    scaleCtrl.addEventListener('click', onScaleCtrlClick);
    switchEffects();
  }
};

function closeViewPopup() {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');

  inputFile.value = '';
  inputHashtag.value = '';
  form.value = '';

  inputFile.addEventListener('change', openViewPopup);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtn.removeEventListener('click', closeViewPopup);
  form.removeEventListener('keydown', onInputKeydown);
  form.removeEventListener('submit', submitForm);
  scaleCtrl.removeEventListener('click', onScaleCtrlClick);
  removeClickEffectsContainer();
}

export const uploadImg = () => inputFile.addEventListener('change', openViewPopup);
