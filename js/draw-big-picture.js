import { isEscapeKey } from './utils.js';

const STEP_COMMENTS = 5;

const popup = document.querySelector('.big-picture');
const closeBtn = popup.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const thumbnailsContainerElement = popup.querySelector('.social__comments');
const loadComment = popup.querySelector('.social__comment-count');
const loadCommentCount = popup.querySelector('.js-load-comment-count');
const loadBtn = popup.querySelector('.comments-loader');

let currentComments = null;
let sliceCurrentComments = null;
let endIndex = 0;

const bigPictureInfo = {
  img: document.querySelector('.big-picture__img').querySelector('img'),
  likes: document.querySelector('.likes-count'),
  comments: document.querySelector('.comments-count'),
  description: document.querySelector('.social__caption')
};

const getCommentTemplate = (comment) => `<li class="social__comment">
<img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
<p class="social__text">${comment.message}</p>
</li>`;

const renderComments = () => {
  endIndex = Math.min(currentComments.length, endIndex + STEP_COMMENTS);
  sliceCurrentComments = currentComments.slice(0, endIndex);

  thumbnailsContainerElement.innerHTML = '';

  if (sliceCurrentComments) {
    thumbnailsContainerElement.insertAdjacentHTML('beforeend', sliceCurrentComments.map((element) => getCommentTemplate(element)).join(''));
    loadCommentCount.textContent = `${endIndex} из ${currentComments.length} комментариев`;
  }

  if (endIndex === currentComments.length) {
    loadBtn.classList.add('hidden');
  }
};

const renderMainData = (photo) => {
  bigPictureInfo.img.src = photo.url;
  bigPictureInfo.likes.textContent = photo.likes;
  bigPictureInfo.comment = photo.comments.length;
  bigPictureInfo.description.textContent = photo.description;
};

const onLoadBtnClick = () => renderComments(currentComments);

const initComments = (comments) => {
  endIndex = 0;
  currentComments = comments;

  renderComments(comments);

  if (comments.length <= STEP_COMMENTS) {
    loadBtn.classList.add('hidden');
    loadComment.classList.add('hidden');
  } else {
    loadBtn.classList.remove('hidden');
    loadComment.classList.remove('hidden');
    loadBtn.addEventListener('click', onLoadBtnClick);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeViewPopup();
  }
};

const onCloseBtnClick = () => closeViewPopup();

function closeViewPopup() {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  loadBtn.removeEventListener('click', onLoadBtnClick);
}

export const openViewPopup = (photo) => {
  renderMainData(photo);
  initComments(photo.comments);

  popup.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeBtn.addEventListener('click', onCloseBtnClick);
};
