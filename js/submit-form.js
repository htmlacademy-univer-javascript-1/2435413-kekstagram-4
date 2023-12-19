import { showAlert, isEscapeKey } from './util.js';
import { switchEffects, removeClickEffectsContainer } from './switch-effects.js';
import { sendData } from './api.js';

const ValuesScaleControl = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
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
const scaleControl = popup.querySelector('.img-upload__scale');
const valueControl = scaleControl.querySelector('.scale__control--value');
const picture = popup.querySelector('.img-upload__preview');
const submitButton = form.querySelector('.img-upload__submit');

let currentValueControl = +valueControl.value.slice(0, -1);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__input'
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

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
  evt.preventDefault();

  if (isValid()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(closeViewPopup)
      .catch((err) => showAlert(err.message))
      .finally(unblockSubmitButton);
  }
};

pristine.addValidator(inputHashtag, isValidHashtags, 'введён невалидный хэш-тег');
pristine.addValidator(inputHashtag, isCorrectCountHashtags, 'превышено количество хэш-тегов');
pristine.addValidator(inputHashtag, hasNotDuplicatesHashtags, 'хэш-теги повторяются');

const isValidFileType = (file) => FILE_TYPES.some((type) => file.type === type);

const onScaleControlClick = (evt) => {
  currentValueControl = +valueControl.value.slice(0, -1);

  if (evt.target.textContent === 'Уменьшить') {
    currentValueControl = Math.max(ValuesScaleControl.MIN, currentValueControl - ValuesScaleControl.STEP);
  }
  if (evt.target.textContent === 'Увеличить') {
    currentValueControl = Math.min(ValuesScaleControl.MAX, currentValueControl + ValuesScaleControl.STEP);
  }

  valueControl.value = `${currentValueControl}%`;
  picture.style.scale = currentValueControl / 100;
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

    valueControl.value = '100%';
    picture.style.scale = 1;

    scaleControl.addEventListener('click', onScaleControlClick);
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
  scaleControl.removeEventListener('click', onScaleControlClick);
  removeClickEffectsContainer();
}

export const uploadImg = () => inputFile.addEventListener('change', openViewPopup);
