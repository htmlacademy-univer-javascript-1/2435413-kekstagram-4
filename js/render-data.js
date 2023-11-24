const thumbnailsContainerElement = document.querySelector('.social__comments');
const countComments = document.querySelector('.social__comment-count');
const loadBtn = document.querySelector('.comments-loader');

const bigPictureInfo = {
  img: document.querySelector('.big-picture__img').querySelector('img'),
  likes: document.querySelector('.likes-count'),
  comments: document.querySelector('.comments-count'),
  description: document.querySelector('.social__caption')
};

let photos = null;

const getCommentTemplate = (comment) => `<li class="social__comment">
<img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
<p class="social__text">${comment.message}</p>
</li>`;

const thumbnailsInit = (data) => {
  photos = data.slice();

  if (photos) {
    thumbnailsContainerElement.insertAdjacentHTML('afterbegin', photos.map((element) => getCommentTemplate(element)).join(''));
  }
};

export const renderMainData = (photo) => {
  bigPictureInfo.img.src = photo.url;
  bigPictureInfo.likes.textContent = photo.likes;
  bigPictureInfo.comment = photo.comments.length;
  bigPictureInfo.description.textContent = photo.description;
};

export const renderComments = (comments) => {
  const defaultComments = thumbnailsContainerElement.querySelectorAll('li');

  defaultComments.forEach((value) => {
    thumbnailsContainerElement.removeChild(value);
  });

  thumbnailsInit(comments);
  countComments.classList.add('hidden');
  loadBtn.classList.add('hidden');
};
