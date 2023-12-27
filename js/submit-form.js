import { isEscapeKey } from './utils.js';
import { switchEffects, removeClickEffectsContainer } from './switch-effects.js';
import { sendData } from './api.js';
import { errorMessageClone, successMessageClone } from './thumbnails-init.js';

const ValuesScaleControl = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

const MAX_COUNT_HASHTAGS = 5;
const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['image/jpeg', 'image/svg', 'image/png'];

const form = document.querySelector('.img-upload__form');
const description = form.querySelector('.text__description');
const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const inputFile = imgUpload.querySelector('.img-upload__input');
const popup = imgUpload.querySelector('.img-upload__overlay');
const closeBtn = popup.querySelector('.img-upload__cancel');
const inputHashtag = popup.querySelector('.text__hashtags');
const scaleControl = popup.querySelector('.img-upload__scale');
const valueControl = scaleControl.querySelector('.scale__control--value');
const preview = popup.querySelector('.img-upload__preview img');
const submitButton = form.querySelector('.img-upload__submit');

const errorBtn = errorMessageClone.querySelector('.error__button');
const successBtn = successMessageClone.querySelector('.success__button');

let currentValueControl = +valueControl.value.slice(0, -1);
let isErrorOccurred = false;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__input'
});

const onErrorBtnClick = () => closeErrorMessage();

const onSuccessBtnClick = () => closeSuccessMessage();

const onDocumentClick = (evt) => {
  if (evt.target === errorMessageClone) {
    closeErrorMessage();
  }
  if (evt.target === successMessageClone) {
    closeSuccessMessage();
  }
};

const onCloseBtnClick = () => closeViewPopup();

const onMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    closeSuccessMessage();
  }
};

const showAlert = () => {
  isErrorOccurred = true;

  errorMessageClone.classList.remove('hidden');

  errorBtn.addEventListener('click', onErrorBtnClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccess = () => {
  successMessageClone.classList.remove('hidden');

  successBtn.addEventListener('click', onSuccessBtnClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onDocumentClick);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  closeViewPopup();
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

const onInputSubmit = (evt) => {
  evt.preventDefault();

  if (isValid()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(showSuccess)
      .catch(showAlert)
      .finally(unblockSubmitButton);
  }
};

pristine.addValidator(inputHashtag, isValidHashtags, 'введён невалидный хэш-тег');
pristine.addValidator(inputHashtag, isCorrectCountHashtags, 'превышено количество хэш-тегов');
pristine.addValidator(inputHashtag, hasNotDuplicatesHashtags, 'хэш-теги повторяются');

const isValidFileType = (file) => FILE_TYPES.some((type) => file.type.toLowerCase() === type);

const onScaleControlClick = (evt) => {
  currentValueControl = +valueControl.value.slice(0, -1);

  if (evt.target.textContent === 'Уменьшить') {
    currentValueControl = Math.max(ValuesScaleControl.MIN, currentValueControl - ValuesScaleControl.STEP);
  }
  if (evt.target.textContent === 'Увеличить') {
    currentValueControl = Math.min(ValuesScaleControl.MAX, currentValueControl + ValuesScaleControl.STEP);
  }

  valueControl.value = `${currentValueControl}%`;
  preview.style.scale = currentValueControl / 100;
};

const openViewPopup = () => {
  isErrorOccurred = false;
  const file = inputFile.files[0];

  if (isValidFileType(file)) {
    preview.src = URL.createObjectURL(file);

    popup.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    closeBtn.addEventListener('click', onCloseBtnClick);
    form.addEventListener('keydown', onInputKeydown);
    form.addEventListener('submit', onInputSubmit);

    valueControl.value = '100%';
    preview.style.scale = 1;

    scaleControl.addEventListener('click', onScaleControlClick);
    switchEffects();
  }
};

function closeViewPopup() {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');

  if (!isErrorOccurred) {
    inputFile.value = '';
    inputHashtag.value = '';
    form.value = '';
    description.value = '';
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  form.removeEventListener('keydown', onInputKeydown);
  form.removeEventListener('submit', onInputSubmit);
  scaleControl.removeEventListener('click', onScaleControlClick);
  removeClickEffectsContainer();
}

const removeEventonDocument = () => {
  document.removeEventListener('keydown', onMessageKeydown);
  document.removeEventListener('click', onDocumentClick);
};

function closeErrorMessage() {
  errorMessageClone.classList.add('hidden');
  errorBtn.removeEventListener('click', onErrorBtnClick);
  openViewPopup();
  removeEventonDocument();
}

function closeSuccessMessage() {
  successMessageClone.classList.add('hidden');
  successBtn.removeEventListener('click', onSuccessBtnClick);
  removeEventonDocument();
}

export const uploadImg = () => inputFile.addEventListener('change', () => openViewPopup());
