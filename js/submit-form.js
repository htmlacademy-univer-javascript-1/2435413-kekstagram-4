import { isEscapeKey } from './util.js';

const MAX_COUNT_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const inputFile = imgUpload.querySelector('.img-upload__input');
const popup = imgUpload.querySelector('.img-upload__overlay');
const closeBtn = popup.querySelector('.img-upload__cancel');
const inputHashtag = popup.querySelector('.text__hashtags');

let hashtags = inputHashtag.value.trim().split(' ');

const regex = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__input'
});

const isValid = () => pristine.validate();

const isCorrectHashtags = () => hashtags.every((hashtag) => regex.test(hashtag)) || inputHashtag.value === '';

const isCorrectCountHashtags = () => hashtags.length <= MAX_COUNT_HASHTAGS;

const hasNotDuplicatesHashtags = () => (new Set(hashtags)).size === hashtags.length;

const isValidHashtags = () => {
  hashtags = inputHashtag.value.trim().split(' ');
  return isCorrectHashtags() && isCorrectCountHashtags() && hasNotDuplicatesHashtags();
};

const getErrorMessage = () => {
  if (!isCorrectHashtags()) {
    return 'введён невалидный хэш-тег';
  } else if (!hasNotDuplicatesHashtags()) {
    return 'хэш-теги повторяются';
  } else if (!isCorrectCountHashtags()){
    return 'превышено количество хэш-тегов';
  }
};

const OnInputKeydown = (evt) => {
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

pristine.addValidator(inputHashtag, isValidHashtags, getErrorMessage);

const openViewPopup = () => {
  const file = inputFile.files[0];

  if (file.type.slice(0, 5) === 'image') {
    popup.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    closeBtn.addEventListener('click', closeViewPopup);
    form.addEventListener('keydown', OnInputKeydown);
    form.addEventListener('submit', submitForm);
    inputFile.removeEventListener('change', openViewPopup);
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
  form.removeEventListener('keydown', OnInputKeydown);
  form.removeEventListener('submit', submitForm);
}

export const uploadImg = () => inputFile.addEventListener('change', openViewPopup);
