const STEP_COMMENTS = 5;

const loadComment = document.querySelector('.social__comment-count');
const loadCommentCount = document.querySelector('.js-load-comment-count');
export const loadBtn = document.querySelector('.comments-loader');

let thumbnailsContainerElement;
let defaultComments;
let currentComments;
let dataPhotos;
let endIndex;

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

const thumbnailsInit = (data) => {
  endIndex = Math.min(data.length, endIndex + STEP_COMMENTS);
  dataPhotos = data.slice(0, endIndex);

  thumbnailsContainerElement = document.querySelector('.social__comments');
  defaultComments = thumbnailsContainerElement.querySelectorAll('li');

  defaultComments.forEach((value) => {
    thumbnailsContainerElement.removeChild(value);
  });

  if (dataPhotos) {
    thumbnailsContainerElement.insertAdjacentHTML('beforeend', dataPhotos.map((element) => getCommentTemplate(element)).join(''));
    loadCommentCount.textContent = `${endIndex} из ${data.length} комментариев`;
  }

  if (endIndex === data.length) {
    loadBtn.classList.add('hidden');
  }
};

export const renderMainData = (photo) => {
  bigPictureInfo.img.src = photo.url;
  bigPictureInfo.likes.textContent = photo.likes;
  bigPictureInfo.comment = photo.comments.length;
  bigPictureInfo.description.textContent = photo.description;
};

export const onBtnClick = () => thumbnailsInit(currentComments);

export const renderComments = (comments) => {
  endIndex = 0;
  currentComments = comments;

  thumbnailsInit(comments);

  if (comments.length <= STEP_COMMENTS) {
    loadBtn.classList.add('hidden');
    loadComment.classList.add('hidden');
  } else {
    loadBtn.classList.remove('hidden');
    loadComment.classList.remove('hidden');

    loadBtn.addEventListener('click', onBtnClick);
  }
};
